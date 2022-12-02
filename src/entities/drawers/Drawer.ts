import { Colors } from '@/models/enums'
import { DrawerParams, TextParams } from '@/models'
import { CS, System } from '@/utils'
import { IPoint } from '@/models/types'

export default class Drawer {
  private params: DrawerParams = {
    isCartesian: false,
    strokeStyle: '',
  }
  protected c2d: CanvasRenderingContext2D

  constructor(
    c2d: CanvasRenderingContext2D,
    params: DrawerParams = { isCartesian: false, strokeStyle: '' },
  ) {
    this.c2d = c2d
    params.isCartesian && this.toCartesian()
    this.c2d.strokeStyle = params.strokeStyle
    this.params = params
  }

  public drawArrow(
    to: IPoint = { x: 0, y: 0 },
    from: IPoint = { x: 0, y: 0 },
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

  public fillText(
    text: string,
    { x = 0, y = 0, fillStyle = Colors.dark, align = 'center' }: TextParams,
  ): void {
    const c = this.c2d

    c.font = '1rem Calibri'
    c.fillStyle = fillStyle
    c.textAlign = align
    c.fillText(text, x, y)
  }

  public strokeLine(
    to: IPoint = { x: 0, y: 0 },
    from: IPoint = { x: 0, y: 0 },
  ): void {
    const c = this.c2d

    c.beginPath()
    c.moveTo(from.x, from.y)
    c.lineTo(to.x, to.y)

    c.stroke()
  }

  public update(): void {
    this.params.isCartesian && this.toCartesian()
    this.c2d.strokeStyle = this.params.strokeStyle
  }

  protected scale({ x, y }: IPoint): void {
    this.c2d.scale(x, y)
  }

  protected translate({ x, y }: IPoint): void {
    this.c2d.translate(x, y)
  }

  protected reset(): void {
    this.c2d.setTransform(1, 0, 0, 1, 0, 0)
  }

  protected toCartesian(): void {
    this.translate(CS.getCenter())
    this.scale({ x: 1, y: -1 })
  }
}
