import Drawer from './Drawer'
import { Colors } from '@/models/enums'
import { System } from '@/utils'
import { IPoint } from '@/models/types'

export default class TrigonometryDrawer extends Drawer {
  constructor(c2d: CanvasRenderingContext2D) {
    super(c2d, { isCartesian: true, fillStyle: Colors.green })
  }

  public drawSin(
    startAngle: number = -Math.PI,
    endAngle: number = Math.PI,
    amplitude: number = System.CM,
  ): void {
    const points: IPoint[] = []

    for (let angle = startAngle; angle < endAngle; angle += 0.01) {
      points.push({ x: angle * amplitude, y: Math.sin(angle) * amplitude })
    }

    points.forEach(p => this.drawPoint(p))
  }

  public drawCos(
    startAngle: number = -Math.PI,
    endAngle: number = Math.PI,
    amplitude: number = System.CM,
  ): void {
    const points: IPoint[] = []

    for (let angle = startAngle; angle < endAngle; angle += 0.01) {
      points.push({ x: angle * amplitude, y: Math.cos(angle) * amplitude })
    }

    points.forEach(p => this.drawPoint(p))
  }
}
