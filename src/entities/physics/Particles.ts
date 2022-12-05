import Entity from './Entity'
import Vector from '../math/Vector'
import Utils from '@/utils/general'
import BoundingBox from '../BoundingBox'
import { System } from '@/utils'
import { ParticleParams } from '@/models'
import { EntityFormType, Rectangle } from '@/models/types'

export default class Particle extends Entity {
  public form: EntityFormType = 'circle'
  public bounds: BoundingBox
  private _params: ParticleParams = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    radius: 0,
    velocity: new Vector(0, 0),
    mode: 'stroke',
    style: '',
    alpha: 1,
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
    this.bounds = this.getBounds()
  }

  public update(): void {
    super.update()
  }

  public getBounds() {
    const { w, h, radius } = this._params

    switch (this.form) {
      case 'circle':
        return new BoundingBox(
          this._position,
          { w: radius, h: radius },
          -radius,
        )
      case 'rect':
        return new BoundingBox(this._position, { w, h })
    }
  }

  public get params(): Partial<ParticleParams> {
    const { w, h, radius, mode, style, alpha } = this._params

    switch (this.form) {
      case 'circle':
        return { radius, mode, style, alpha }
      case 'rect':
        return { w, h, mode, style, alpha }
      default:
        return this._params
    }
  }
}

export function getRandomParticle(areaRect: Rectangle): Particle {
  let params: Partial<ParticleParams> = {}

  const { x, y } = Utils.getRandomPositionInsideArea(
    { w: System.CM, h: System.CM },
    areaRect,
  )
  const size = Utils.getRandomIntByInterval(System.HCM, System.CM * 2)
  const radius = Utils.getRandomIntByInterval(System.HCM, System.CM)
  const velocity = Utils.getRandomVector2(-4, 4)
  const style = Utils.getRandomColor()
  const alpha = parseFloat((Math.random() + 0.1).toFixed(1))
  params = {
    x,
    y,
    w: size,
    h: size,
    radius,
    velocity,
    mode: 'fill',
    style,
    alpha,
  }

  return new Particle(params)
}
