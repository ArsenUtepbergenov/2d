import Config from '@/models/config'
import { C2D } from '@/models/game'
import { Matrix } from '../math/Matrix'
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

export function createCollisionLayer(level: Level) {
  const tileResolver = level.tileCollider.tileResolver
  const tileSize = tileResolver.tileSize
  const resolvedTiles = new Matrix()

  const getByIndexOriginal = tileResolver.getByIndex

  tileResolver.getByIndex = function getByIndexFake(x, y) {
    resolvedTiles.set(x, y, true)
    return getByIndexOriginal.call(tileResolver, x, y)
  }

  return function drawCollisions(context: C2D) {
    context.strokeStyle = 'blue'
    resolvedTiles.forEach((_, x, y) => {
      context.beginPath()
      context.rect(x * tileSize, y * tileSize, tileSize, tileSize)
      context.stroke()
    })

    context.strokeStyle = 'red'
    level.entities.forEach(entity => {
      context.beginPath()
      context.rect(entity.x, entity.y, entity.size.w, entity.size.h)
      context.stroke()
    })

    resolvedTiles.clear()
  }
}
