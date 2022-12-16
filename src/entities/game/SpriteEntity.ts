import { Sides } from '@/models/enums'
import { C2D } from '@/models/game'
import BoundingBox from '../BoundingBox'
import Vector2 from '../math/Vector2'
import EntityTrait from './entity-traits/EntityTrait'

export default abstract class SpriteEntity {
  public offset = { x: 0, y: 0 }
  public position = { x: 0, y: 0 }
  public velocity = new Vector2(0, 0)
  public size = { w: 0, h: 0 }
  public bounds = new BoundingBox(this.position, this.size, this.offset)
  protected traits: EntityTrait[] = []

  public abstract draw(context: C2D): void

  public update(dTime: number): void {
    this.traits.forEach(t => t.update(this, dTime))
  }

  public obstruct(side: Sides) {
    this.traits.forEach(t => t.obstruct(side))
  }

  public addTrait(trait: EntityTrait): void {
    this.traits.push(trait)
    this[trait.name] = trait
  }

  [key: string]: any
}
