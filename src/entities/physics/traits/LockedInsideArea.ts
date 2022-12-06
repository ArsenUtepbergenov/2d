import Trait from './Trait'
import Entity from '../Entity'
import { Sides } from '@/models/enums'

export default class LockedInsideArea extends Trait {
  constructor() {
    super('LockedInsideArea')
  }

  public obstruct(entity: Entity, side: Sides): void {
    if (side === Sides.LEFT || side === Sides.RIGHT) entity.velocity.negateX()
    if (side === Sides.TOP || side === Sides.BOTTOM) entity.velocity.negateY()
  }
}
