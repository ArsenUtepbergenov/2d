import { BoxParams } from '@/models'
import BoundingBox from '../BoundingBox'
import Vector2 from '../math/Vector2'
import { distanceTo } from '../math/common'
import Entity from './Entity'

export default class Box extends Entity {
  public bounds: BoundingBox
  public params: BoxParams = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    velocity: new Vector2(0, 0),
    speed: 0,
    direction: 0,
    acceleration: new Vector2(0, 0),
    mass: 0,
    mode: 'stroke',
    style: '',
    alpha: 1,
  }

  constructor(params: Partial<BoxParams>) {
    super('rect')
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

  public angleTo(particle: Box): number {
    return Math.atan2(particle.y - this.y, particle.x - this.x)
  }

  public distanceTo(particle: Box): number {
    return distanceTo(particle.x - this.x, particle.y - this.y)
  }

  public gravitateTo(particle: Box): void {
    const gravity = new Vector2(0, 0)
    const distance = this.distanceTo(particle)

    gravity.length = particle.mass / (distance * distance)
    gravity.angle = this.angleTo(particle)

    this.velocity.addTo(gravity)
  }

  public getBounds() {
    const { w, h } = this.params
    return new BoundingBox(this.position, { w, h })
  }

  public get formParams() {
    const { w, h, mode, style, alpha } = this.params
    return { w, h, mode, style, alpha }
  }
}
