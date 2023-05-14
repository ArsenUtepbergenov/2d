import { DrawerParams, TextParams } from '@/models'
import Config from '@/models/config'
import { CS } from '@/models/cs'
import { Colors } from '@/models/enums'
import { C2D } from '@/models/game'
import { Point } from '../math/Point'

export default class Drawer {
  private params: Partial<DrawerParams> = {
    isCartesian: false,
    strokeStyle: '',
    fillStyle: '',
    globalAlpha: 1,
  }
  protected c2d: C2D

  constructor(c2d: C2D, params?: Partial<DrawerParams>) {
    this.c2d = c2d

    if (!params) return

    params.isCartesian && this.toCartesian()
    this.c2d.strokeStyle = params.strokeStyle || ''
    this.c2d.fillStyle = params.fillStyle || ''
    this.c2d.globalAlpha = params.globalAlpha || 1
    this.params = {
      ...this.params,
      ...params,
    }
  }

  public setStrokeStyle(style: string | CanvasGradient | CanvasPattern): void {
    this.c2d.strokeStyle = style
  }

  public setFillStyle(style: string | CanvasGradient | CanvasPattern): void {
    this.c2d.fillStyle = style
  }

  public setGlobalAlpha(value: number = 1): void {
    this.c2d.globalAlpha = value
  }

  public applyContext2d(c2d: C2D): void {
    this.c2d = c2d
    this.update()
  }

  public drawPoint({ x, y }: Point): void {
    this.c2d.fillRect(x, y, 1, 1)
  }

  public fillText(
    text: string,
    { x = 0, y = 0, fillStyle = Colors.dark, align = 'center' }: TextParams,
  ): void {
    const c = this.c2d

    c.font = Config.FONT
    c.fillStyle = fillStyle
    c.textAlign = align
    c.fillText(text, x, y)
  }

  public strokeLine(to: Point = { x: 0, y: 0 }, from: Point = { x: 0, y: 0 }): void {
    const c = this.c2d

    c.beginPath()
    c.moveTo(from.x, from.y)
    c.lineTo(to.x, to.y)

    c.stroke()
  }

  public update(): void {
    this.params.isCartesian && this.toCartesian()
    this.c2d.strokeStyle = this.params.strokeStyle || ''
    this.c2d.fillStyle = this.params.fillStyle || ''
    this.c2d.globalAlpha = this.params.globalAlpha || 1
  }

  public scale({ x, y }: Point): void {
    this.c2d.scale(x, y)
  }

  public translate({ x, y }: Point): void {
    this.c2d.translate(x, y)
  }

  public toCartesian(): void {
    this.translate(CS.center)
    this.scale({ x: 1, y: -1 })
  }
}
