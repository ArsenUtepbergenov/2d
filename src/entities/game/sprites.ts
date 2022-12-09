import Config from '@/models/config'
import { loadImage } from '@/utils/loaders'
import SpriteSheet from './SpriteSheet'

export async function loadBackgroundSprites() {
  const image = await loadImage(Config.TILES)
  const sprites = new SpriteSheet(
    image as HTMLImageElement,
    Config.TILE_SIZE,
    Config.TILE_SIZE,
  )
  sprites.defineTile('brickWall', 21, 22)
  sprites.defineTile('ground', 9, 22)
  sprites.defineTile('groundAboutWallTop', 9, 21)
  sprites.defineTile('groundAboutWallTopRight', 10, 21)
  sprites.defineTile('groundAboutWallTopLeft', 8, 21)
  sprites.defineTile('groundAboutWallRight', 10, 22)
  sprites.defineTile('groundAboutWallLeft', 8, 22)
  return sprites
}

export async function loadPlayerSprite() {
  const image = await loadImage(Config.CHARACTERS)
  const sprites = new SpriteSheet(
    image as HTMLImageElement,
    Config.TILE_SIZE,
    Config.TILE_SIZE,
  )
  sprites.defineTile('player', 1, 0)
  return sprites
}
