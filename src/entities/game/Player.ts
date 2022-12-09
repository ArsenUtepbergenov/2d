import Config from '@/models/config'
import { C2D } from '@/models/game'
import BoundingBox from '../BoundingBox'
import Vector2 from '../math/Vector2'
import SpriteEntity from './SpriteEntity'
import SpriteSheet from './SpriteSheet'
import { loadPlayerSprite } from './sprites'

export async function createPlayer() {
  const player = new Player()
  player.x = Config.PLAYER_START_X
  player.y = Config.PLAYER_START_Y
  player.size = Config.PLAYER_SIZE
  player.velocity = new Vector2(0, 0)
  player.bounds = new BoundingBox(
    { x: player.x, y: player.y },
    { w: player.size.w, h: player.size.h },
  )
  player.sprite = await loadPlayerSprite()
  return player
}

export default class Player extends SpriteEntity {
  public sprite: SpriteSheet | null = null

  constructor() {
    super()
  }

  public draw(context: C2D): void {
    this.sprite?.draw(context, 'player', 0, 0)
  }

  public update(dTime: number): void {
    super.update(dTime)
  }
}
