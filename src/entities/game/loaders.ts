import Level from '@/entities/game/Level'
import {
  createBackgroundLayer, // createCollisionLayer,
  createSpriteLayer,
} from '@/entities/game/layers'
import Config from '@/models/config'
import { Background, FrameSpec, TileSpec } from '@/models/game'
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

function createTiles(level: Level, backgrounds: Background[]) {
  function applyRange(
    background: Background,
    xStart: number,
    xLength: number,
    yStart: number,
    yLength: number,
  ) {
    const xEnd = xStart + xLength
    const yEnd = yStart + yLength

    for (let x = xStart; x < xEnd; ++x) {
      for (let y = yStart; y < yEnd; ++y) {
        level.tiles.set(x, y, {
          name: background.tile,
          type: background.type,
        })
      }
    }
  }

  backgrounds.forEach((background: Background) => {
    background.ranges.forEach(range => {
      const length = range.length

      if (length === 4) {
        const [xStart, xLength, yStart, yLength] = range
        applyRange(background, xStart, xLength, yStart, yLength)
      } else if (length === 3) {
        const [xStart, xLength, yStart] = range
        applyRange(background, xStart, xLength, yStart, 1)
      } else if (length === 2) {
        const [xStart, yStart] = range
        applyRange(background, xStart, 1, yStart, 1)
      }
    })
  })
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

  createTiles(level, spec.backgrounds)

  level.compositor.layers.push(createBackgroundLayer(level, backgroundSprites))

  level.compositor.layers.push(createSpriteLayer(level.entities))

  // level.compositor.layers.push(createCollisionLayer(level))

  return level
}
