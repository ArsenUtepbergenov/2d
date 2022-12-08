import Drawer from './Drawer'
import Vector2 from '../math/Vector2'
import { Point } from '../math/Point'
import { Colors } from '@/models/enums'
import { System } from '@/models/system'

export default class VectorDrawer extends Drawer {
  constructor(c2d: CanvasRenderingContext2D) {
    super(c2d, { isCartesian: true, strokeStyle: Colors.green })
  }

  public draw2(vector: Vector2): void {
    this.drawArrow(System.convertToCM(vector.xy))
  }

  public drawArrow(
    to: Point = { x: 0, y: 0 },
    from: Point = { x: 0, y: 0 },
  ): void {
    const c = this.c2d

    const offsetX = (a: number) => System.ARROWHEAD * Math.cos(a)
    const offsetY = (a: number) => System.ARROWHEAD * Math.sin(a)

    const angle = Math.atan2(to.y - from.y, to.x - from.x)
    const left = angle - Math.PI / 6
    const right = angle + Math.PI / 6

    this.strokeLine(to, from)
    c.lineTo(to.x - offsetX(left), to.y - offsetY(left))
    c.moveTo(to.x, to.y)
    c.lineTo(to.x - offsetX(right), to.y - offsetY(right))

    c.stroke()
  }
}
