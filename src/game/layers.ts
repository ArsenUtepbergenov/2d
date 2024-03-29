import Config from '@/models/config'
import { C2D, Tile } from '@/models/game'
import { Matrix } from '../entities/math/Matrix'
import Camera from './Camera'
import Level from './Level'
import SpriteEntity from './SpriteEntity'
import SpriteSheet from './SpriteSheet'
import TileResolver from './TileResolver'

export function createBackgroundLayer(
  level: Level,
  tiles: Matrix<Tile>,
  sprites: SpriteSheet,
) {
  const resolver = new TileResolver(tiles)

  const buffer = document.createElement('canvas')
  buffer.width = Config.WORLD_WIDTH + Config.TILE_SIZE
  buffer.height = Config.WORLD_HEIGHT

  const context = buffer.getContext('2d')!

  function redraw(startIndex: number, endIndex: number) {
    context.clearRect(0, 0, buffer.width, buffer.height)

    for (let x = startIndex; x <= endIndex; x++) {
      const column = tiles.grid[x]

      if (column) {
        column.forEach(({ name }, y) =>
          sprites.drawTile(context, name, x - startIndex, y),
        )
      }
    }
  }

  return function drawBackgroundLayer(context: C2D, camera: Camera) {
    const drawWidth = resolver.toIndex(camera.size.w)
    const drawFrom = resolver.toIndex(camera.position.x)
    const drawTo = drawFrom + drawWidth

    redraw(drawFrom, drawTo)

    context.drawImage(buffer, -camera.position.x % Config.TILE_SIZE, -camera.position.y)
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

      context.imageSmoothingEnabled = false

      context.drawImage(
        sBuffer,
        entity.position.x - camera.position.x,
        entity.position.y - camera.position.y,
      )
    })
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
