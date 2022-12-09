import Config from '@/models/config'
import { C2D } from '@/models/game'
import { Matrix } from '../math/Matrix'
import Camera from './Camera'
import Level from './Level'
import SpriteEntity from './SpriteEntity'
import SpriteSheet from './SpriteSheet'

export function createBackgroundLayer(level: Level, sprites: SpriteSheet) {
  const tiles = level.tiles
  const resolver = level.tileCollider.tileResolver

  const buffer = document.createElement('canvas')
  buffer.width = Config.WORLD_WIDTH + Config.TILE_SIZE
  buffer.height = Config.WORLD_HEIGHT

  const context = buffer.getContext('2d')!

  let startIndex: number
  let endIndex: number

  function redraw(drawFrom: number, drawTo: number) {
    if (drawFrom === startIndex && drawTo === endIndex) {
      return
    }

    console.log('redraw')

    startIndex = drawFrom
    endIndex = drawTo

    for (let x = startIndex; x <= endIndex; x++) {
      const column = tiles.grid[x]

      if (column) {
        column.forEach((tile, y) => {
          sprites.drawTile(context, tile.name, x - startIndex, y)
        })
      }
    }
  }

  return function drawBackgroundLayer(context: C2D, camera: Camera) {
    const drawWidth = resolver.toIndex(camera.size.w)
    // const drawHeight = resolver.toIndex(camera.size.h)
    const drawFrom = resolver.toIndex(camera.position.x)
    const drawTo = drawFrom + drawWidth

    redraw(drawFrom, drawTo)

    context.drawImage(
      buffer,
      -camera.position.x % Config.TILE_SIZE,
      -camera.position.y,
    )
  }
}

export function createSpriteLayer(entities: Set<SpriteEntity>, w = 64, h = 64) {
  const sBuffer = document.createElement('canvas')
  sBuffer.width = w
  sBuffer.height = h
  const sContext = sBuffer.getContext('2d')!

  return function drawSpriteLayer(context: C2D, camera: Camera) {
    entities.forEach(entity => {
      sContext.clearRect(0, 0, w, h)

      entity.draw(sContext)

      context.drawImage(
        sBuffer,
        entity.x - camera.position.x,
        entity.y - camera.position.y,
      )
    })
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

  return function drawCollisions(context: C2D, camera: Camera) {
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

    context.strokeStyle = 'red'
    level.entities.forEach(entity => {
      context.beginPath()
      context.rect(
        entity.x - camera.position.x,
        entity.y - camera.position.y,
        entity.size.w,
        entity.size.h,
      )
      context.stroke()
    })

    resolvedTiles.clear()
  }
}

export function createCameraLayer(cameraToDraw: Camera) {
  return function drawCameraRect(context: C2D, fromCamera: Camera) {
    context.strokeStyle = 'purple'
    context.beginPath()
    context.rect(
      cameraToDraw.position.x - fromCamera.position.x,
      cameraToDraw.position.y - fromCamera.position.y,
      cameraToDraw.size.w,
      cameraToDraw.size.h,
    )
    context.stroke()
  }
}
