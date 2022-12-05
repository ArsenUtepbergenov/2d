import Entity from './Entity'
import Vector from '../math/Vector'
import { EntityFormType } from '@/models/types'
import { ParticleParams } from '@/models'
import { Sides } from '@/models/enums'

export function getParticle(params: Partial<ParticleParams>): Particle {
  let _params = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    radius: 0,
    velocity: new Vector(0, 0),
  }
  _params = {
    ..._params,
    ...params,
  }
  return new Particle(_params)
}

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
    this.y = this._params.y
    this.velocity = this._params.velocity
  }

  public update(): void {
    if (this.velocity.xy.x > 0) {
      if (this.x > 700) this.obstruct(Sides.RIGHT)
    } else if (this.velocity.xy.x < 0) {
      if (this.x < 100) this.obstruct(Sides.LEFT)
    }
    if (this.velocity.xy.y < 0) {
      if (this.y < 100) this.obstruct(Sides.TOP)
    } else if (this.velocity.xy.y > 0) {
      if (this.y > 700) this.obstruct(Sides.BOTTOM)
    }
    super.update()
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
