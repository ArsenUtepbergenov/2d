import Canvas from './Canvas'
import Drawer from './drawers/Drawer'
import { CanvasParams } from '@/models'

export default class Renderer {
  protected canvas: Canvas
  protected drawers: Map<string, Drawer> = new Map()

  constructor(ref: HTMLCanvasElement, params: CanvasParams) {
    this.canvas = new Canvas(ref, params)
  }

  public applyDrawer(drawer: Drawer): void {
    this.drawers.set(drawer.constructor.name, drawer)
  }

  public getDrawer(name: string): Drawer | undefined {
    try {
      if (!this.hasDrawer(name)) {
        throw new Error(`The drawer ${name} has not applied yet!`)
      }
    } catch (error) {
      console.error(error)
    } finally {
      return this.drawers.get(name)
    }
  }

  public hasDrawer(name: string): boolean {
    return this.drawers.has(name) && this.drawers.get(name) !== undefined
  }

  public setSize(w: number = 0, h: number = 0): void {
    this.canvas.setSize(w, h)
  }

  public clear(): void {
    this.canvas.clear()
  }

  public get c2d(): CanvasRenderingContext2D {
    return this.canvas.c2d
  }

  public get rect() {
    return this.canvas.rect
  }
}
