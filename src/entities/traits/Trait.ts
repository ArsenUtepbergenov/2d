import Entity from '../physics/Entity'
import { Sides } from '@/models/enums'

export default abstract class Trait {
  public name: string

  constructor(name: string) {
    this.name = name
  }

  public abstract update(entity: Entity): void
  public abstract obstruct(entity: Entity, side: Sides): void
}
