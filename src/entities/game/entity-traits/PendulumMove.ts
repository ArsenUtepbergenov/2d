import { HeadingSides, Sides } from '@/models/enums'
import SpriteEntity from '../SpriteEntity'
import EntityTrait from './EntityTrait'

export default class PendulumMove extends EntityTrait {
  public directionX = 0
  public speed = -100
  public distanceX = 0
  public heading = HeadingSides.DOWN

  constructor() {
    super('pendulumMove')
  }

  public update(entity: SpriteEntity, dTime: number): void {
    entity.velocity.x = this.speed * dTime

    if (entity.velocity.x > 0) {
      this.directionX = 1
    } else if (entity.velocity.x < 0) {
      this.directionX = -1
    }

    const dirX = this.directionX

    if (dirX) {
      this.distanceX += Math.abs(entity.velocity.x) * dTime

      if (dirX > 0) this.heading = HeadingSides.RIGHT
      if (dirX < 0) this.heading = HeadingSides.LEFT
    } else {
      this.distanceX = 0
    }
  }

  public obstruct(side: Sides): void {
    if (side === Sides.LEFT || side === Sides.RIGHT) this.speed = -this.speed
  }
}
