import Config from '@/models/config'
import { C2D } from '@/models/game'
import BoundingBox from '../BoundingBox'
import Vector2 from '../math/Vector2'
import SpriteEntity from './SpriteEntity'
import SpriteSheet from './SpriteSheet'
import { createAnimation } from './animation'

export default class Player extends SpriteEntity {
  public sprite: SpriteSheet | null = null
  private stands = ['stand-down', 'stand-left', 'stand-right', 'stand-up']
  private goRight = createAnimation(['go-right-1', 'go-right-2'])
  private goLeft = createAnimation(['go-left-1', 'go-left-2'])
  private goUp = createAnimation(['go-up-1', 'go-up-2'])
  private goDown = createAnimation(['go-down-1', 'go-down-2'])

  private static instance: Player
  public static get() {
    if (!this.instance) this.instance = this.create()
    return this.instance
  }
  private constructor() {
    super()
  }

  private static create(): Player {
    const p = new Player()

    p.size = Config.PLAYER_SIZE
    p.offset = Config.PLAYER_OFFSET
    p.position = Config.PLAYER_START_POSITION
    p.velocity = new Vector2(0, 0)
    p.bounds = new BoundingBox(p.position, p.size, p.offset)
    return p
  }

  public draw(context: C2D): void {
    this.sprite?.draw(context, this.currentFrame, 0, 0)
  }

  public update(dTime: number): void {
    super.update(dTime)
  }

  private get currentFrame(): string {
    const dirX = this.move.directionX
    const dirY = this.move.directionY

    if (dirX !== 0) {
      const dX = this.move.distanceX

      if (dirX > 0) {
        return this.goRight(dX)
      } else if (dirX < 0) {
        return this.goLeft(dX)
      }
    }

    if (dirY !== 0) {
      const dY = this.move.distanceY

      if (dirY > 0) {
        return this.goDown(dY)
      } else if (dirY < 0) {
        return this.goUp(dY)
      }
    }

    return this.stands[this.move.heading]
  }
}
