import Level from '@/game/Level'
import { createBackgroundLayer, createSpriteLayer } from '@/game/layers'
import Config from '@/models/config'
import { FrameSpec, TileSpec } from '@/models/game'
import SpriteSheet from './SpriteSheet'
import { createBackgroundGrid, createCollisionGrid } from './expanders'

export function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise(resolve => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
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
      sprites.define(name, ...rect),
    )
  }

  return sprites
}

export async function loadPlayer() {
  return await loadSpriteSheet(Config.PLAYER)
}

export async function loadEnemy() {
  return await loadSpriteSheet(Config.ENEMY)
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
