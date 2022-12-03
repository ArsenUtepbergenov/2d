import { Point } from '../math/Point'
import Vector from '../math/Vector'
import Entity from './Entity'
import PhysicsTrait from './traits/PhysicsTrait'

export default class Particle extends Entity {
  constructor() {
    super()
  }

  public get position(): Point {
    return this.trait.position
  }

  public set position(value: Point) {
    this.trait.position = value
  }

  public get velocity(): Vector {
    return this.trait.velocity
  }

  public set velocity(value: Vector) {
    this.trait.velocity = value
  }

  private get trait(): PhysicsTrait {
    return this.traits.get('PhysicsTrait') as PhysicsTrait
  }
}
