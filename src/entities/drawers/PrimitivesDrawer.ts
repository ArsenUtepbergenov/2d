import Drawer from './Drawer'
import { Colors } from '@/models/enums'
import { CircleParams } from '@/models'
import { Point } from '../math/Point'

export default class PrimitivesDrawer extends Drawer {
  constructor(c2d: CanvasRenderingContext2D) {
    super(c2d, { isCartesian: true, strokeStyle: Colors.green })
  }

  public strokeCircle(
    { x, y }: Point,
    { radius = 0, startAngle = 0, endAngle = Math.PI * 2 }: CircleParams,
  ): void {
    const c = this.c2d

    c.beginPath()
    c.arc(x, y, radius, startAngle, endAngle)
    c.stroke()
  }
}
