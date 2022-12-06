import Vector from '../math/Vector'
import BoundingBox from '../BoundingBox'
import getPoint, { Point } from '../math/Point'
import { Sides } from '@/models/enums'
import { EntityParams, FormParams } from '@/models'
import { EntityFormType, ITrait } from '@/models/types'

export default abstract class Entity {
  public abstract form: EntityFormType
  public abstract params: EntityParams
  public abstract formParams: FormParams
  public abstract bounds: BoundingBox
  private traits: Map<string, ITrait> = new Map()
  private lifeTime = 0
  private _position = getPoint()
  private _velocity = new Vector(0, 0)
  private _acceleration = new Vector(0, 0)

  public addTrait(trait: ITrait): void {
    if (this.hasTrait(trait.name)) return
    this.traits.set(trait.name, trait)
  }

  protected hasTrait(name: string): boolean {
    return this.traits.has(name) && this.traits.get(name) !== undefined
  }

  protected update(): void {
    this._velocity = this._velocity.add(this._acceleration)
    this.x += this._velocity.x
    this.y += this._velocity.y
  }

  public obstruct(side: Sides) {
    this.traits.forEach(t => t.obstruct(this, side))
  }

  public get acceleration(): Vector {
    return this._acceleration
  }

  public set acceleration(vector: Vector) {
    this._acceleration = vector
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
