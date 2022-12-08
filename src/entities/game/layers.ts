import { Config } from '@/models/enums'
import { Background } from '@/models/game'
import SpriteSheet from './SpriteSheet'

function drawBackground(
  background: Background,
  context: CanvasRenderingContext2D,
  sprites: SpriteSheet,
) {
  const [x1, x2, y1, y2] = background.ranges

  for (let x = x1; x < x2; ++x) {
    for (let y = y1; y < y2; ++y) {
      sprites.drawTile(context, background.tile, x, y)
    }
  }
}

export function createBackgroundLayer(
  backgrounds: Background[],
  sprites: SpriteSheet,
) {
  const buffer = document.createElement('canvas')
  buffer.width = Config.WORLD_WIDTH
  buffer.height = Config.WORLD_HEIGHT

  backgrounds.forEach(background => {
    drawBackground(background, buffer.getContext('2d')!, sprites)
  })

  return function drawBackgroundLayer(context: CanvasRenderingContext2D) {
    context.drawImage(buffer, 0, 0)
  }
}

export function createSpriteLayer(sprite: SpriteSheet, x: number, y: number) {
  return function drawSpriteLayer(context: CanvasRenderingContext2D) {
    sprite.draw(context, 'player', x, y)
  }
}
