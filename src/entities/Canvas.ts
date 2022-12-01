import { CanvasParams, MouseEventHandler } from '../models'

export default class Canvas {
  private width = 0
  private height = 0
  private context2d: CanvasRenderingContext2D
  private instance: HTMLCanvasElement

  constructor(ref: HTMLCanvasElement, { width, height }: CanvasParams) {
    this.instance = ref
    this.context2d = this.instance.getContext('2d', { alpha: false })!

    this.init({ width, height })
  }

  public setCursor(cursor: string = 'default'): void {
    this.instance.style.cursor = cursor
  }

  public setSize(width: number = 0, height: number = 0): void {
    this.width = this.instance.width = width
    this.height = this.instance.height = height
  }

  public fill(color: string | CanvasGradient | CanvasPattern = 'black'): void {
    this.context2d.fillStyle = color
    this.context2d.fillRect(0, 0, this.width, this.height)
  }

  public clear(): void {
    this.context2d.clearRect(0, 0, this.width, this.height)
  }

  public get c2d(): CanvasRenderingContext2D {
    return this.context2d!
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

  private init({ width, height }: CanvasParams): void {
    try {
      this.setSize(width, height)
    } catch (error) {
      console.error(error)
    }
  }
}
