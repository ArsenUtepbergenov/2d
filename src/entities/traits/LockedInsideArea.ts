import { Sides } from '@/models/enums'
import Entity from '../physics/Entity'
import Trait from './Trait'

export default class LockedInsideArea extends Trait {
  constructor() {
    super('lockedInsideArea')
  }

  public update(entity: Entity): void {}

  public obstruct(entity: Entity, side: Sides): void {
    if (side === Sides.LEFT || side === Sides.RIGHT) entity.velocity.negateX()
    if (side === Sides.TOP || side === Sides.BOTTOM) entity.velocity.negateY()
  }
}
