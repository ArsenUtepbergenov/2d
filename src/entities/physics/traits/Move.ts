import Trait from './Trait.js'
import Entity from '../Entity.js'
import { Sides } from '@/models/enums'

export default class Move extends Trait {
  public wall: Sides | null = null
  public direction = 0

  constructor() {
    super('move')
  }

  public update(entity: Entity): void {
    console.log(entity)

    if (this.direction !== 0) {
      console.log(this.direction)

      entity.velocity.x = entity.params.speed * this.direction
    }
  }

  public obstruct(entity: Entity, side: Sides): void {}
}
