import { loadImage } from '@/entities/game/loaders'
import Config from '@/models/config'
import SpriteSheet from './SpriteSheet'

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
