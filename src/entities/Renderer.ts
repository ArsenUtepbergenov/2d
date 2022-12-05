import Canvas from './Canvas'
import Drawer from './drawers/Drawer'
import Entity from './physics/Entity'
import Entities from '@/utils/entities'
import PrimitivesDrawer from './drawers/PrimitivesDrawer'
import { CanvasParams } from '@/models'

export default class Renderer {
  private canvas: Canvas
  private drawers: Map<string, Drawer> = new Map()

  constructor(ref: HTMLCanvasElement, params: CanvasParams) {
    this.canvas = new Canvas(ref, params)
  }

  public render(entity: Entity): void {
    if (Entities.isPrimitive(entity.form)) {
      this.renderPrimitive(entity)
    }
  }

  private renderPrimitive(entity: Entity): void {
    const drawer = this.getDrawer('PrimitivesDrawer') as PrimitivesDrawer
    const { position, form, params } = entity
    const { mode, style, alpha, w, h, radius } = params
    drawer.setFillStyle(style)
    drawer.setGlobalAlpha(alpha)

    switch (form) {
      case 'rect':
        drawer.rect(position, { w, h }, mode)
        break
      case 'circle':
        drawer.arc(position, { radius }, mode)
        break
    }
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

  private hasDrawer(name: string): boolean {
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
