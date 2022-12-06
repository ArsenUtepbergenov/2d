import Entity from './Entity'
import Vector from '../math/Vector'
import Utils from '@/utils/general'
import BoundingBox from '../BoundingBox'
import { System } from '@/utils'
import { EntityParams, FormParams } from '@/models'
import { EntityFormType, Rectangle } from '@/models/types'

export default class Particle extends Entity {
  public form: EntityFormType = 'circle'
  public bounds: BoundingBox
  public params: EntityParams = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    radius: 0,
    velocity: new Vector(0, 0),
    acceleration: new Vector(0, 0),
    mode: 'stroke',
    style: '',
    alpha: 1,
  }

  constructor(params: Partial<EntityParams>) {
    super()
    this.params = {
      ...this.params,
      ...params,
    }
    this.x = this.params.x
    this.y = this.params.y
    this.velocity = this.params.velocity
    this.acceleration = this.params.acceleration
    this.bounds = this.getBounds()
  }

  public update(): void {
    super.update()
  }

  public getBounds() {
    const { w, h, radius } = this.params

    switch (this.form) {
      case 'circle':
        return new BoundingBox(this.position, { w: radius, h: radius }, -radius)
      case 'rect':
        return new BoundingBox(this.position, { w, h })
    }
  }

  public get formParams(): FormParams {
    const { w, h, radius, mode, style, alpha } = this.params
    return { w, h, radius, mode, style, alpha }
  }
}

export function getRandomParticle(areaRect: Rectangle): Particle {
  const { x, y } = Utils.getRandomPositionInsideArea(
    { w: System.CM, h: System.CM },
    areaRect,
  )
  const size = Utils.getRandomIntByInterval(System.HCM, System.CM * 2)
  const radius = Utils.getRandomIntByInterval(System.HCM, System.CM)
  const velocity = Utils.getRandomVector2(-4, 4)
  const style = Utils.getRandomColor()
  const alpha = parseFloat((Math.random() + 0.1).toFixed(1))
  const params: EntityParams = {
    x,
    y,
    w: size,
    h: size,
    radius,
    velocity,
    acceleration: new Vector(0, 0),
    mode: 'fill',
    style,
    alpha,
  }

  return new Particle(params)
}
