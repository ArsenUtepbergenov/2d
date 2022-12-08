import { Sides } from '@/models/enums'
import Entity from '../physics/Entity'

export default abstract class Trait {
  public name: string

  constructor(name: string) {
    this.name = name
  }

  public abstract obstruct(entity: Entity, side: Sides): void
}
