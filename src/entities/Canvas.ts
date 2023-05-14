import { C2D } from '@/models/game'
import { CanvasParams, MouseEventHandler } from '../models'

export default class Canvas {
  private w = 0
  private h = 0
  private _c2d: C2D
  private instance: HTMLCanvasElement

  constructor(ref: HTMLCanvasElement, { w, h, alpha = false }: CanvasParams) {
    this.instance = ref
    this._c2d = this.instance.getContext('2d', { alpha })!

    this.init({ w, h })
  }

  public setCursor(cursor: string = 'default'): void {
    this.instance.style.cursor = cursor
  }

  public setSize(w: number = 0, h: number = 0): void {
    this.w = this.instance.width = w
    this.h = this.instance.height = h
  }

  public fill(color: string | CanvasGradient | CanvasPattern = 'black'): void {
    this._c2d.fillStyle = color
    this._c2d.fillRect(0, 0, this.w, this.h)
  }

  public clear(): void {
    this._c2d.save()
    this._c2d.resetTransform()
    this._c2d.clearRect(0, 0, this.w, this.h)
    this._c2d.restore()
  }

  public get rect() {
    return { x: 0, y: 0, w: this.w, h: this.h }
  }

  public get c2d(): C2D {
    return this._c2d!
  }

  public get domRect(): DOMRect {
    return this.instance.getBoundingClientRect()
  }

  public set mouseDown(fn: MouseEventHandler) {
    this.instance.onmousedown = fn
  }

  public set mouseMove(fn: MouseEventHandler) {
    this.instance.onmousemove = fn
  }

  public set mouseUp(fn: MouseEventHandler) {
    this.instance.onmouseup = fn
  }

  public set click(fn: MouseEventHandler) {
    this.instance.onclick = fn
  }

  public set contextMenu(fn: MouseEventHandler) {
    this.instance.oncontextmenu = fn
  }

  private init({ w, h }: CanvasParams): void {
    try {
      this.setSize(w, h)
    } catch (error) {
      console.error(error)
    }
  }
}
