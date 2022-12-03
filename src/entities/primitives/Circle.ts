import { ICircle } from '@/models/types'
import { Point } from '../math/Point'

export default class Circle implements ICircle {
  public position: Point = new Point(0, 0)
  public radius: number = 1

  constructor(position: Point, radius: number) {
    this.position = position
    this.radius = radius
  }
}
