import Entity from './Entity'
import Utils from '@/utils/general'
import Vector2 from '../math/Vector2'
import BoundingBox from '../BoundingBox'
import { System } from '@/utils'
import { EntityParams, FormParams } from '@/models'
import { EntityFormType, Rectangle } from '@/models/types'
import { distanceTo } from '../math/common'

export default class Particle extends Entity {
  public form: EntityFormType = 'circle'
  public bounds: BoundingBox
  public params: EntityParams = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    radius: 0,
    velocity: new Vector2(0, 0),
    speed: 0,
    direction: 0,
    acceleration: new Vector2(0, 0),
    mass: 0,
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
    this.velocity.length = this.params.speed
    this.velocity.angle = this.params.direction
    this.acceleration = this.params.acceleration
    this.mass = this.params.mass
    this.bounds = this.getBounds()
  }

  public update(): void {
    this.x += this.velocity.x
    this.y += this.velocity.y
  }

  public angleTo(particle: Particle): number {
    return Math.atan2(particle.y - this.y, particle.x - this.x)
  }

  public distanceTo(particle: Particle): number {
    return distanceTo(particle.x - this.x, particle.y - this.y)
  }

  public gravitateTo(particle: Particle): void {
    const gravity = new Vector2(0, 0)
    const distance = this.distanceTo(particle)

    gravity.length = particle.mass / (distance * distance)
    gravity.angle = this.angleTo(particle)

    this.velocity.addTo(gravity)
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
    acceleration: new Vector2(0, 0),
    speed: 0,
    direction: 0,
    mass: 0,
    mode: 'fill',
    style,
    alpha,
  }

  return new Particle(params)
}
