import { Matrix } from '@/entities/math/Matrix'
import { C2D } from '@/models/game'
import Camera from '../Camera'
import Level from '../Level'
import SpriteEntity from '../SpriteEntity'
import TileCollider from '../TileCollider'

export function createCollisionLayer(level: Level) {
  const drawTileCandidates = createTileCandidateLayer(level.tileCollider!)
  const drawBoundingBoxes = createEntitiesLayer(level.entities)

  return function drawCollisions(context: C2D, camera: Camera) {
    drawTileCandidates(context, camera)
    drawBoundingBoxes(context, camera)
  }
}

function createEntitiesLayer(entities: Set<SpriteEntity>) {
  return function drawBoundingBoxes(context: C2D, camera: Camera) {
    context.strokeStyle = 'red'
    entities.forEach(entity => {
      context.beginPath()
      context.rect(
        entity.bounds.left - camera.position.x,
        entity.bounds.top - camera.position.y,
        entity.size.w,
        entity.size.h,
      )
      context.stroke()
    })
  }
}

function createTileCandidateLayer(tileCollider: TileCollider) {
  const tileResolver = tileCollider.tileResolver

  const tileSize = tileResolver.tileSize
  const resolvedTiles = new Matrix()

  const getByIndexOriginal = tileResolver.getByIndex

  tileResolver.getByIndex = function getByIndexFake(x, y) {
    resolvedTiles.set(x, y, true)
    return getByIndexOriginal.call(tileResolver, x, y)
  }

  return function drawTileCandidates(context: C2D, camera: Camera) {
    context.strokeStyle = 'blue'
    resolvedTiles.forEach((_, x, y) => {
      context.beginPath()
      context.rect(
        x * tileSize - camera.position.x,
        y * tileSize - camera.position.y,
        tileSize,
        tileSize,
      )
      context.stroke()
    })

    resolvedTiles.clear()
  }
}
