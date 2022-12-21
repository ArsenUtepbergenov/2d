import { HeadingSides } from '@/models/enums'
import SpriteEntity from '../SpriteEntity'
import EntityTrait from './EntityTrait'

export default class Move extends EntityTrait {
  public directionX = 0
  public directionY = 0
  public speed = 160
  public distanceX = 0
  public distanceY = 0
  public heading = HeadingSides.DOWN
  public name = 'move'

  public update(entity: SpriteEntity, dTime: number): void {
    entity.velocity.x = this.speed * this.directionX * dTime
    entity.velocity.y = this.speed * this.directionY * dTime

    const dirX = this.directionX
    const dirY = this.directionY

    if (dirX) {
      this.distanceX += Math.abs(entity.velocity.x) * dTime

      if (dirX > 0) this.heading = HeadingSides.RIGHT
      if (dirX < 0) this.heading = HeadingSides.LEFT
    } else {
      this.distanceX = 0
    }

    if (dirY) {
      this.distanceY += Math.abs(entity.velocity.y) * dTime

      if (dirY > 0) this.heading = HeadingSides.DOWN
      if (dirY < 0) this.heading = HeadingSides.UP
    } else {
      this.distanceY = 0
    }
  }
}
