import Entity from './Entity'
import Utils from '@/utils/general'
import Vector2 from '../math/Vector2'
import BoundingBox from '../BoundingBox'
import { System } from '@/models/system'
import { distanceTo } from '../math/common'
import { EntityParams, FormParams } from '@/models'
import { EntityFormType, Rectangle } from '@/models/types'

export default class Particle extends Entity {
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

  constructor(form: EntityFormType, params: Partial<EntityParams>) {
    super(form)
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
    super.update()
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

export function getRandomParticle(
  form: EntityFormType = 'circle',
  areaRect: Rectangle,
): Particle {
  const size = Utils.getRandomIntByInterval(System.HCM, System.CM)
  const { x, y } = Utils.getRandomPositionInsideArea(
    { w: size, h: size },
    areaRect,
  )
  const params: EntityParams = {
    x,
    y,
    w: size,
    h: size,
    radius: Utils.getRandomIntByInterval(System.HCM, System.CM),
    velocity: new Vector2(0, 0),
    acceleration: new Vector2(0, 0),
    speed: 3,
    direction: Math.random() * (Math.PI * 2),
    mass: 0,
    mode: 'fill',
    style: Utils.getRandomColor(),
    alpha: 1,
  }

  return new Particle(form, params)
}
