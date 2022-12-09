import { CS } from '@/models/cs'
import { Colors } from '@/models/enums'
import { C2D } from '@/models/game'
import { System } from '@/models/system'
import { ISize } from '@/models/types'
import Drawer from './Drawer'

export default class CoordinateSystemDrawer extends Drawer {
  constructor(c2d: C2D) {
    super(c2d)
  }

  public draw({ w, h }: ISize): void {
    const c = this.c2d

    c.setLineDash([1, 1])
    c.strokeStyle = Colors.grey

    this.drawGrid({ w, h })

    c.lineWidth = 2
    c.setLineDash([0, 0])
    c.strokeStyle = Colors.brown

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

  private drawAxisX(max: number): void {
    this.strokeLine({ x: 0, y: CS.cY }, { x: max, y: CS.cY })
    this.drawXDashes(max)
  }

  private drawAxisY(max: number): void {
    this.strokeLine({ x: CS.cX, y: 0 }, { x: CS.cX, y: max })
    this.drawYDashes(max)
  }

  private drawXDashes(max: number): void {
    const half = CS.getNumberCMs(max) / 2
    const length = 4
    const p = (i: number) => CS.cX + i * System.CM
    const n = (i: number) => CS.cX - i * System.CM
    const pY = CS.cY + length
    const nY = CS.cY - length

    for (let i = 0; i < half; i++) {
      this.strokeLine({ x: p(i), y: pY }, { x: p(i), y: nY })
      this.strokeLine({ x: n(i), y: pY }, { x: n(i), y: nY })
      if (i <= 0) continue
      this.fillText(`${i}`, { x: p(i), y: pY + 18 })
      this.fillText(`${-i}`, { x: n(i), y: pY + 18 })
    }
  }

  private drawYDashes(max: number): void {
    const half = CS.getNumberCMs(max) / 2
    const length = 4
    const p = (i: number) => CS.cY + i * System.CM
    const n = (i: number) => CS.cY - i * System.CM
    const pX = CS.cX + length
    const nX = CS.cX - length

    for (let i = 0; i < half; i++) {
      this.strokeLine({ x: pX, y: p(i) }, { x: nX, y: p(i) })
      this.strokeLine({ x: pX, y: n(i) }, { x: nX, y: n(i) })
      if (i <= 0) continue
      this.fillText(`${-i}`, { x: nX + 18, y: p(i) + 4 })
      this.fillText(`${i}`, { x: nX + 18, y: n(i) + 4 })
    }
  }
}
