import { DrawerParams } from '@/models'
import { ICircleArc, IRect } from '@/models/types'
import { Point } from '../math/Point'
import Drawer from './Drawer'

export default class PrimitivesDrawer extends Drawer {
  constructor(c2d: CanvasRenderingContext2D, params?: Partial<DrawerParams>) {
    super(c2d, params)
  }

  public rect(
    { x, y }: Point,
    rect: IRect,
    mode: 'fill' | 'stroke' = 'stroke',
  ): void {
    const c = this.c2d
    const { w, h } = rect
    c.beginPath()
    c.rect(x, y, w, h)
    mode === 'stroke' ? c.stroke() : c.fill()
  }

  public arc(
    { x, y }: Point,
    arc: ICircleArc,
    mode: 'fill' | 'stroke' = 'stroke',
  ): void {
    const c = this.c2d
    const {
      radius,
      startAngle = 0,
      endAngle = Math.PI * 2,
      counterclockwise = false,
    } = arc
    c.beginPath()
    c.arc(x, y, radius, startAngle, endAngle, counterclockwise)
    mode === 'stroke' ? c.stroke() : c.fill()
  }
}
