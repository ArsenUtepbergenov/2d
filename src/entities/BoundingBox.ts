import { ISize } from '@/models/types'
import { Point } from './math/Point'

export default class BoundingBox {
  private position: Point
  private size: ISize
  private offset: number

  constructor(position: Point, size: ISize, offset: number = 0) {
    this.position = position
    this.size = size
    this.offset = offset
  }

  public get bottom() {
    return this.position.y + this.size.h
  }

  public set bottom(y) {
    this.position.y = y - this.size.h
  }

  public get top() {
    return this.position.y + this.offset
  }

  public set top(y) {
    this.position.y = y + this.offset
  }

  public get left() {
    return this.position.x + this.offset
  }

  public set left(x) {
    this.position.x = x + this.offset
  }

  public get right() {
    return this.position.x + this.size.w
  }

  public set right(x) {
    this.position.x = x - this.size.w
  }
}
