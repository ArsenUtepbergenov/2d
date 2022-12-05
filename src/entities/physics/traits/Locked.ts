import Trait from './Trait'
import Entity from '../Entity'
import { Sides } from '@/models/enums'

export default class Locked extends Trait {
  constructor() {
    super('Locked')
  }

  public obstruct(entity: Entity, side: Sides): void {
    if (side === Sides.LEFT || side === Sides.RIGHT)
      entity.velocity = entity.velocity.negateX()
    if (side === Sides.TOP || side === Sides.BOTTOM)
      entity.velocity = entity.velocity.negateY()
  }
}
