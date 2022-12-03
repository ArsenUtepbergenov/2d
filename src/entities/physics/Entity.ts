import { ITrait, TraitName } from '@/models/types'

export default abstract class Entity {
  protected traits: Map<TraitName, ITrait> = new Map()

  public addTrait(trait: ITrait): void {
    if (this.hasTrait(trait.name)) return
    this.traits.set(trait.name, trait)
  }

  protected hasTrait(name: TraitName): boolean {
    return this.traits.has(name) && this.traits.get(name) !== undefined
  }
}
