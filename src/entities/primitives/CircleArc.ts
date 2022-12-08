import { ICircleArc } from '@/models/types'

export default class CircleArc implements ICircleArc {
  public radius = 1
  public startAngle = 0
  public endAngle = Math.PI * 2
  public counterclockwise = false

  constructor({
    radius = 1,
    startAngle = 0,
    endAngle = Math.PI * 2,
    counterclockwise = false,
  }) {
    this.radius = radius
    this.startAngle = startAngle
    this.endAngle = endAngle
    this.counterclockwise = counterclockwise
  }
}
