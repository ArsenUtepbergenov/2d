import { Size } from '@/models/types'
import { Point } from './math/Point'

export default class BoundingBox {
  private size: Size
  private offset: Point
  private position: Point

  constructor(position: Point, size: Size, offset = { x: 0, y: 0 }) {
    this.position = position
    this.size = size
    this.offset = offset
  }

  public get bottom() {
    return this.position.y + this.size.h + this.offset.y
  }

  public set bottom(y) {
    this.position.y = y - (this.size.h + this.offset.y)
  }

  public get top() {
    return this.position.y + this.offset.y
  }

  public set top(y) {
    this.position.y = y - this.offset.y
  }

  public get left() {
    return this.position.x + this.offset.x
  }

  public set left(x) {
    this.position.x = x - this.offset.x
  }

  public get right() {
    return this.position.x + this.size.w + this.offset.x
  }

  public set right(x) {
    this.position.x = x - (this.size.w + this.offset.x)
  }
}
