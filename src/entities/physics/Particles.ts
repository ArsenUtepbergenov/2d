import Entity from './Entity'
import Vector from '../math/Vector'
import { EntityFormType } from '@/models/types'
import { ParticleParams } from '@/models'

export default class Particle extends Entity {
  public form: EntityFormType = 'circle'
  private _params: ParticleParams = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    radius: 0,
    velocity: new Vector(0, 0),
  }

  constructor(params: Partial<ParticleParams>) {
    super()
    this._params = {
      ...this._params,
      ...params,
    }
    this.x = this._params.x
    this.y = this._params.x
    this.velocity = this._params.velocity
  }

  public update(): void {
    super.update(0)
  }

  public get params(): Partial<ParticleParams> {
    const { w, h, radius } = this._params

    switch (this.form) {
      case 'circle':
        return { radius }
      case 'rect':
        return { w, h }
      default:
        return this._params
    }
  }
}
