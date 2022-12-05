import Vector from '../math/Vector'
import { Sides } from '@/models/enums'
import { EntityFormType, ITrait } from '@/models/types'
import getPoint, { Point } from '../math/Point'
import BoundingBox from '../BoundingBox'

export default abstract class Entity {
  public abstract form: EntityFormType
  public abstract params: any
  public abstract bounds: BoundingBox
  protected traits: Map<string, ITrait> = new Map()
  protected lifeTime = 0
  protected _position = getPoint()
  protected _velocity = new Vector(0, 0)

  public addTrait(trait: ITrait): void {
    if (this.hasTrait(trait.name)) return
    this.traits.set(trait.name, trait)
  }

  protected hasTrait(name: string): boolean {
    return this.traits.has(name) && this.traits.get(name) !== undefined
  }

  protected update(): void {
    this.x += this.velocity.x
    this.y += this.velocity.y
  }

  public obstruct(side: Sides) {
    this.traits.forEach(t => t.obstruct(this, side))
  }

  public get velocity(): Vector {
    return this._velocity
  }

  public set velocity(vector: Vector) {
    this._velocity = vector
  }

  public get position(): Point {
    return this._position
  }

  public get x(): number {
    return this._position.x
  }

  public set x(value: number) {
    this._position.x = value
  }

  public get y(): number {
    return this._position.y
  }

  public set y(value: number) {
    this._position.y = value
  }

  public stop(): void {
    this._velocity = new Vector(0, 0)
  }
}
