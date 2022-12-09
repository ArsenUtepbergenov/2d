import { Colors } from '@/models/enums'
import { C2D } from '@/models/game'
import { System } from '@/models/system'
import { Point } from '../math/Point'
import Drawer from './Drawer'

export default class TrigonometryDrawer extends Drawer {
  private points: Point[] = []

  constructor(c2d: C2D) {
    super(c2d, { isCartesian: true, fillStyle: Colors.green })
  }

  public drawSin(
    startAngle: number = -Math.PI,
    endAngle: number = Math.PI,
    amplitude: number = System.CM,
  ): void {
    this.points = []

    for (let angle = startAngle; angle < endAngle; angle += 0.01) {
      this.points.push({ x: angle * amplitude, y: Math.sin(angle) * amplitude })
    }

    this.points.forEach(p => this.drawPoint(p))
  }

  public drawCos(
    startAngle: number = -Math.PI,
    endAngle: number = Math.PI,
    amplitude: number = System.CM,
  ): void {
    this.points = []

    for (let angle = startAngle; angle < endAngle; angle += 0.01) {
      this.points.push({ x: angle * amplitude, y: Math.cos(angle) * amplitude })
    }

    this.points.forEach(p => this.drawPoint(p))
  }
}
