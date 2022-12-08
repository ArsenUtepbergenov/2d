import SpriteSheet from './SpriteSheet'
import { Config } from '@/models/enums'
import { loadImage } from '@/entities/game/loaders.js'

export async function loadBackgroundSprites() {
  const image = await loadImage(Config.TILES)
  const sprites = new SpriteSheet(image as HTMLImageElement, 32, 32)
  sprites.defineTile('brickWall', 21, 22)
  sprites.defineTile('ground', 9, 22)
  sprites.defineTile('groundAboutWallTop', 9, 21)
  sprites.defineTile('groundAboutWallTopRight', 10, 21)
  sprites.defineTile('groundAboutWallTopLeft', 8, 21)
  sprites.defineTile('groundAboutWallRight', 10, 22)
  sprites.defineTile('groundAboutWallLeft', 8, 22)
  return sprites
}
