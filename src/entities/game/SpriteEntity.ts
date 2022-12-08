import Vector2 from '../math/Vector2'

export default abstract class SpriteEntity {
  public x = 32
  public y = 64
  public velocity = new Vector2(100, 0)
  protected traits: Trait[] = []

  public abstract draw(context: CanvasRenderingContext2D): void

  public update(dTime: number): void {
    this.traits.forEach(t => t.update(this, dTime))
  }

  public addTrait(trait: Trait): void {
    this.traits.push(trait)
    this[trait.name] = trait
  }

  [key: string]: any
}

abstract class Trait {
  constructor(public name: string) {
    this.name = name
  }

  public abstract update(entity: SpriteEntity, dTime: number): void
}

export class Move extends Trait {
  constructor() {
    super('move')
  }

  public update(entity: SpriteEntity, dTime: number): void {
    entity.x += entity.velocity.x * dTime
    entity.y += entity.velocity.y * dTime
  }
}
