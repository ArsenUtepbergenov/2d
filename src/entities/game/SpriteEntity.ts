import { C2D } from '@/models/game'
import Vector2 from '../math/Vector2'
import EntityTrait from './entity-traits/EntityTrait'

export default abstract class SpriteEntity {
  public x = 0
  public y = 0
  public size = { w: 0, h: 0 }
  public velocity = new Vector2(0, 0)
  protected traits: EntityTrait[] = []

  public abstract draw(context: C2D): void

  public update(dTime: number): void {
    this.traits.forEach(t => t.update(this, dTime))
  }

  public addTrait(trait: EntityTrait): void {
    this.traits.push(trait)
    this[trait.name] = trait
  }

  [key: string]: any
}
