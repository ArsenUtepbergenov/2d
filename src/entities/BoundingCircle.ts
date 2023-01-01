import { Point } from './math/Point'

export default class BoundingCircle {
  private radius: number
  private offset: Point
  private position: Point

  constructor(position: Point, radius: number, offset = { x: 0, y: 0 }) {
    this.position = position
    this.radius = radius
    this.offset = offset
  }

  public get bottom() {
    return this.position.y + this.radius + this.offset.y
  }

  public get top() {
    return this.position.y - this.radius + this.offset.y
  }

  public get left() {
    return this.position.x - this.radius + this.offset.x
  }

  public get right() {
    return this.position.x + this.radius + this.offset.x
  }
}
