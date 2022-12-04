import Vector from '../math/Vector'
import getVelocity from './props/Velocity'
import { EntityFormType, ITrait } from '@/models/types'
import getPoint, { Point } from '../math/Point'

export default abstract class Entity {
  public abstract form: EntityFormType
  public abstract params: any
  protected traits: Map<string, ITrait> = new Map()
  protected lifeTime = 0
  protected _position = getPoint()
  protected _velocity = getVelocity()

  public addTrait(trait: ITrait): void {
    if (this.hasTrait(trait.name)) return
    this.traits.set(trait.name, trait)
  }

  protected hasTrait(name: string): boolean {
    return this.traits.has(name) && this.traits.get(name) !== undefined
  }

  protected update(dTime: number): void {
    //TODO: update(this, dTime)
    this.traits.forEach(trait => trait.update())
    this.lifeTime += dTime
  }

  protected obstruct() {
    //TODO:
  }

  public get velocity(): Vector {
    return this._velocity.value
  }

  public set velocity(vector: Vector) {
    this._velocity.value = vector
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
    this._velocity.reset()
  }
}
