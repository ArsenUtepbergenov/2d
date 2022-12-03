import Vector from '@/entities/math/Vector'
import { Point } from '@/entities/math/Point'

export class Velocity {
  readonly name = 'Velocity'
  private _value = new Vector(0, 0)

  constructor(value?: Vector) {
    if (value) this._value = value
  }

  public reset(): void {
    this._value = new Vector(0, 0)
  }

  public get value(): Vector {
    return this._value
  }

  public set value(vector: Vector) {
    this._value = vector
  }
}

export default function getVelocity(value?: Point | Vector): Velocity {
  const isPoint = value instanceof Point
  const isVector = value instanceof Vector

  if (isPoint) return new Velocity(new Vector(...Object.values(value)))
  else if (isVector) return new Velocity(value)
  else return new Velocity()
}
