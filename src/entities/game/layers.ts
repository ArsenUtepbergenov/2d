import { Config } from '@/models/enums'
import { C2D } from '@/models/game'
import Level from './Level'
import SpriteEntity from './SpriteEntity'
import SpriteSheet from './SpriteSheet'

export function createBackgroundLayer(level: Level, sprites: SpriteSheet) {
  const buffer = document.createElement('canvas')
  buffer.width = Config.WORLD_WIDTH
  buffer.height = Config.WORLD_HEIGHT

  const context = buffer.getContext('2d')!

  level.tiles.forEach((tile, x, y) =>
    sprites.drawTile(context, tile.name, x, y),
  )

  return function drawBackgroundLayer(context: C2D) {
    context.drawImage(buffer, 0, 0)
  }
}

export function createSpriteLayer(entities: Set<SpriteEntity>) {
  return function drawSpriteLayer(context: C2D) {
    entities.forEach(entity => entity.draw(context))
  }
}
