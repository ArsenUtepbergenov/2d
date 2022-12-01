import { ISize } from '../models/types'
import { CoordinateSystem, Colors } from '../models/enums'

export default class Drawer {
  private context2d: CanvasRenderingContext2D | null = null

  public drawCoordinateSystem(
    context2d: CanvasRenderingContext2D,
    { w, h }: ISize,
  ): void {
    this.context2d = context2d
    this.drawGrid({ w, h })
    this.drawAxisX({ w, h })
    this.drawAxisY({ w, h })
  }

  private drawGrid({ w, h }: ISize): void {
    const c = this.context2d
    if (!c) return

    c.setLineDash([1, 1])
    const step = CoordinateSystem.CM

    for (let x = 0.5; x < w; x += step) {
      c.moveTo(x, 0)
      c.lineTo(x, h)
    }

    for (let y = 0.5; y < h; y += step) {
      c.moveTo(0, y)
      c.lineTo(w, y)
    }

    c.strokeStyle = Colors.dark
    c.stroke()
  }

  private drawAxisX({ w, h }: ISize): void {
    const c = this.context2d
    if (!c) return

    const lines = CoordinateSystem.getLines(h)
    const y = CoordinateSystem.getCenterOfAxis(lines)

    c.beginPath()
    c.moveTo(0, y)
    c.lineTo(w, y)

    c.setLineDash([0, 0])
    c.lineWidth = 2
    c.strokeStyle = Colors.lightCoral
    c.stroke()
  }

  private drawAxisY({ w, h }: ISize): void {
    const c = this.context2d
    if (!c) return

    const lines = CoordinateSystem.getLines(w)
    const x = CoordinateSystem.getCenterOfAxis(lines)

    c.beginPath()
    c.moveTo(x, 0)
    c.lineTo(x, h)

    c.setLineDash([0, 0])
    c.lineWidth = 2
    c.strokeStyle = Colors.lightCoral
    c.stroke()
  }
}
