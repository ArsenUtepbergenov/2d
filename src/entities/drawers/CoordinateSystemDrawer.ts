import { ISize } from '@/models/types'
import { Colors } from '@/models/enums'
import Drawer from './Drawer'
import { CS, System } from '@/utils'

export default class CoordinateSystemDrawer extends Drawer {
  constructor(c2d: CanvasRenderingContext2D) {
    super(c2d)
  }

  public draw({ w, h }: ISize): void {
    const c = this.c2d

    c.setLineDash([1, 1])
    c.strokeStyle = Colors.dark

    this.drawGrid({ w, h })

    c.lineWidth = 2
    c.setLineDash([0, 0])
    c.strokeStyle = Colors.lightCoral

    CS.setCenter({ w, h })
    this.drawAxisX(w)
    this.drawAxisY(h)
  }

  private drawGrid({ w, h }: ISize): void {
    const c = this.c2d

    const step = System.HCM

    for (let x = 0.5; x < w; x += step) {
      c.moveTo(x, 0)
      c.lineTo(x, h)
    }

    for (let y = 0.5; y < h; y += step) {
      c.moveTo(0, y)
      c.lineTo(w, y)
    }

    c.stroke()
  }

  private drawAxisX(maxX: number): void {
    this.strokeLine({ x: 0, y: CS.cY }, { x: maxX, y: CS.cY })
  }

  private drawAxisY(maxH: number): void {
    this.strokeLine({ x: CS.cX, y: 0 }, { x: CS.cX, y: maxH })
  }
}
