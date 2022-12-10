import Level from '@/entities/game/Level'
import {
  createBackgroundLayer, // createCollisionLayer,
  createSpriteLayer,
} from '@/entities/game/layers'
import Config from '@/models/config'
import { ExpandedTile, FrameSpec, Patterns, Tile, TileSpec } from '@/models/game'
import { Matrix } from '../math/Matrix'
import SpriteSheet from './SpriteSheet'

export function loadImage(url: string) {
  return new Promise(resolve => {
    const image = new Image()
    image.addEventListener('load', () => {
      resolve(image)
    })
    image.src = url
  })
}

export async function loadJSON(url: string) {
  const r = await fetch(url)
  return await r.json()
}

export async function loadSpriteSheet(url: string) {
  const sheetSpec = await loadJSON(url)
  const image = await loadImage(sheetSpec.imageURL)

  const sprites = new SpriteSheet(
    image as HTMLImageElement,
    Config.TILE_SIZE,
    Config.TILE_SIZE,
  )

  if (sheetSpec.tiles) {
    sheetSpec.tiles.forEach(({ name, index }: TileSpec) =>
      sprites.defineTile(name, ...index),
    )
  }

  if (sheetSpec.frames) {
    sheetSpec.frames.forEach(({ name, rect }: FrameSpec) =>
      sprites.defineTile(name, ...rect),
    )
  }

  return sprites
}

export async function loadPlayer() {
  return await loadSpriteSheet(Config.PLAYER)
}

export async function loadLevel() {
  const [spec, backgroundSprites] = await Promise.all([
    loadJSON(Config.WORLD),
    loadSpriteSheet(Config.WORLD_SPRITES),
  ])

  const level = new Level()

  const mergedTiles = spec.layers.reduce(
    (result: [], layerSpec: Record<string, []>) => {
      return result.concat(layerSpec.tiles)
    },
    [],
  )

  console.log(mergedTiles)

  level.setCollisionGrid(createCollisionGrid(mergedTiles, spec.patterns))

  spec.layers.forEach((layer: Record<string, []>) => {
    level.compositor.layers.push(
      createBackgroundLayer(
        level,
        createBackgroundGrid(layer.tiles, spec.patterns),
        backgroundSprites,
      ),
    )

    level.compositor.layers.push(createSpriteLayer(level.entities))
  })

  return level
}

function createCollisionGrid(tiles: Tile[], patterns: Patterns) {
  const grid = new Matrix<Tile>()

  for (const { tile, x, y } of expandTiles(tiles, patterns)) {
    grid.set(x, y, {
      type: tile.type,
    })
  }

  return grid
}

function createBackgroundGrid(tiles: Tile[], patterns: Patterns) {
  const grid = new Matrix<Tile>()

  for (const { tile, x, y } of expandTiles(tiles, patterns)) {
    grid.set(x, y, {
      name: tile.name,
    })
  }

  return grid
}

function* expandSpan(xStart: number, xLength: number, yStart: number, yLength: number) {
  const xEnd = xStart + xLength
  const yEnd = yStart + yLength

  for (let x = xStart; x < xEnd; ++x) {
    for (let y = yStart; y < yEnd; ++y) {
      yield { x, y }
    }
  }
}

function expandRange(range: number[]) {
  const length = range.length

  if (length === 4) {
    const [xStart, xLength, yStart, yLength] = range
    return expandSpan(xStart, xLength, yStart, yLength)
  } else if (length === 3) {
    const [xStart, xLength, yStart] = range
    return expandSpan(xStart, xLength, yStart, 1)
  } else if (length === 2) {
    const [xStart, yStart] = range
    return expandSpan(xStart, 1, yStart, 1)
  }
}

function* expandRanges(ranges: number[][] = []) {
  for (const range of ranges) {
    for (const item of expandRange(range)!) {
      yield item
    }
  }
}

function expandTiles(tiles: Tile[], patterns: Patterns) {
  const expandedTiles: ExpandedTile[] = []

  function walkTiles(tiles: Tile[], offsetX: number, offsetY: number) {
    for (const tile of tiles) {
      for (const { x, y } of expandRanges(tile.ranges)) {
        const derivedX = x + offsetX
        const derivedY = y + offsetY

        if (tile.pattern) {
          walkTiles(patterns[tile.pattern].tiles, derivedX, derivedY)
        } else {
          expandedTiles.push({
            tile,
            x: derivedX,
            y: derivedY,
          })
        }
      }
    }
  }

  walkTiles(tiles, 0, 0)

  return expandedTiles
}
