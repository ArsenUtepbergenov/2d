import Entity from './Entity'
import { EntityFormType } from '@/models/types'
import { ParticleParams } from '@/models'

export default class Particle extends Entity {
  public form: EntityFormType = 'circle'
  private _params: ParticleParams = {
    w: 0,
    h: 0,
    radius: 0,
  }

  constructor(params: Partial<ParticleParams>) {
    super()
    this._params = {
      ...this._params,
      ...params,
    }
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
