import Drawer from './Drawer'
import { Point } from '../math/Point'
import { ICircleArc, IRect } from '@/models/types'
import { DrawerParams } from '@/models'

export default class PrimitivesDrawer extends Drawer {
  constructor(c2d: CanvasRenderingContext2D, params?: Partial<DrawerParams>) {
    super(c2d, params)
  }

  public rect(
    { x, y }: Point,
    rect: IRect,
    style: 'fill' | 'stroke' = 'stroke',
  ): void {
    const c = this.c2d
    const { w, h } = rect
    c.beginPath()
    c.rect(x, y, w, h)
    style === 'stroke' ? c.stroke() : c.fill()
  }

  public arc(
    { x, y }: Point,
    arc: ICircleArc,
    style: 'fill' | 'stroke' = 'stroke',
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
    style === 'stroke' ? c.stroke() : c.fill()
  }
}
