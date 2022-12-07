import Vector2 from './math/Vector2'
import BoundingBox from './BoundingBox'
import PlayerTrait from './traits/PlayerTrait'
import { Point } from './math/Point'
import { ISize } from '@/models/types'

export default class Player {
  public size: ISize
  public position: Point
  public bounds: BoundingBox
  public velocity: Vector2
  private traits: Map<string, PlayerTrait> = new Map()

  constructor() {
    this.size = { w: 0, h: 0 }
    this.position = new Point(0, 0)
    this.velocity = new Vector2(0, 0)
    this.bounds = this.getBounds()
  }

  private getBounds(): BoundingBox {
    const { w, h } = this.size
    return new BoundingBox(this.position, { w, h })
  }

  public update(): void {
    this.traits.forEach(t => t.update(this))
  }

  public addTrait(trait: PlayerTrait): void {
    if (this.hasTrait(trait.name)) return
    this.traits.set(trait.name, trait)
    this[trait.name] = trait
  }

  public hasTrait(name: string): boolean {
    return this.traits.has(name) && this.traits.get(name) !== undefined
  }

  [key: string]: any
}
