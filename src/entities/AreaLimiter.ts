import { Rectangle } from '@/models/types'
import { Sides } from '@/models/enums'
import Entity from './physics/Entity'

export default class AreaLimiter {
  private rectArea: Rectangle

  constructor(rectArea: Rectangle) {
    this.rectArea = rectArea
  }

  public limit(entity: Entity) {
    this.limitX(entity)
    this.limitY(entity)
  }

  public limitX(entity: Entity) {
    if (entity.velocity.x === 0) return

    if (entity.velocity.x > 0) {
      if (entity.bounds.right > this.rectArea.w) entity.obstruct(Sides.RIGHT)
    } else if (entity.velocity.x < 0) {
      if (entity.bounds.left < this.rectArea.x) entity.obstruct(Sides.LEFT)
    }
  }

  public limitY(entity: Entity) {
    if (entity.velocity.y === 0) return

    if (entity.velocity.y > 0) {
      if (entity.bounds.bottom > this.rectArea.h) entity.obstruct(Sides.BOTTOM)
    } else if (entity.velocity.y < 0) {
      if (entity.bounds.top < this.rectArea.y) entity.obstruct(Sides.TOP)
    }
  }
}
