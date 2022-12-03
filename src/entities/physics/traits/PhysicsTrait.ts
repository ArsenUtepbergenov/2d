import Vector from '@/entities/math/Vector'
import getPoint, { Point } from '@/entities/math/Point'
import getVelocity from '@/entities/physics/props/Velocity'
import { ITrait } from '@/models/types'

export default class PhysicsTrait implements ITrait {
  readonly name = 'PhysicsTrait'
  private _position = getPoint()
  private _velocity = getVelocity()

  public get velocity(): Vector {
    return this._velocity.value
  }

  public set velocity(vector: Vector) {
    this._velocity.value = vector
  }

  public get position(): Point {
    return this._position
  }

  public set position(value: Point) {
    this._position = value
  }

  public stop(): void {
    this._velocity.reset()
  }
}
