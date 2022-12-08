import Trait from '../traits/Trait'
import Vector2 from '../math/Vector2'
import BoundingBox from '../BoundingBox'
import getPoint, { Point } from '../math/Point'
import { Sides } from '@/models/enums'
import { EntityFormType } from '@/models/types'
import { EntityParams, FormParams } from '@/models'

export default abstract class Entity {
  public form: EntityFormType
  public abstract params: EntityParams
  public abstract formParams: FormParams
  public abstract bounds: BoundingBox
  private traits: Map<string, Trait> = new Map()
  private _position = getPoint()
  private _velocity = new Vector2(0, 0)
  private _acceleration = new Vector2(0, 0)
  private _mass = 0

  constructor(form: EntityFormType) {
    this.form = form
  }

  public update(): void {
    this.traits.forEach(t => t.update(this))
  }

  public addTrait(trait: Trait): void {
    if (this.hasTrait(trait.name)) return
    this.traits.set(trait.name, trait)
  }

  protected hasTrait(name: string): boolean {
    return this.traits.has(name) && this.traits.get(name) !== undefined
  }

  public obstruct(side: Sides) {
    this.traits.forEach(t => t.obstruct(this, side))
  }

  public get acceleration(): Vector2 {
    return this._acceleration
  }

  public set acceleration(vector: Vector2) {
    this._acceleration = vector
  }

  public get velocity(): Vector2 {
    return this._velocity
  }

  public set velocity(vector: Vector2) {
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

  public get mass(): number {
    return this._mass
  }

  public set mass(value: number) {
    this._mass = value
  }
}
