import { BallParams, StyleParams } from '@/models'
import { Circle } from '@/models/types'
import BoundingCircle from '../BoundingCircle'
import Entity from './Entity'

export default class Ball extends Entity implements Circle {
  public bounds: BoundingCircle
  public radius = 0
  public elasticity = 0.5
  public gravity = 0.05
  public friction = 0.008
  private styles: StyleParams

  constructor(params: BallParams, styles: StyleParams) {
    super('circle')
    this.styles = styles
    this.x = params.x
    this.y = params.y
    this.radius = params.radius
    this.velocity = params.velocity
    this.acceleration = params.acceleration
    this.mass = params.mass
    this.bounds = new BoundingCircle(this.position, this.radius)
  }

  public update(): void {
    this.x += this.velocity.x
    this.y += this.velocity.y
  }

  public get formParams() {
    const { mode, style, alpha } = this.styles
    return { radius: this.radius, mode, style, alpha }
  }
}
