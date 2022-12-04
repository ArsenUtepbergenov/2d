import Canvas from './Canvas'
import Drawer from './drawers/Drawer'
import Entity from './physics/Entity'
import PrimitivesDrawer from './drawers/PrimitivesDrawer'
import { CanvasParams } from '@/models'
import { EntityFormType, ICircleArc, IRect } from '@/models/types'
import { Primitives } from '@/models/enums'

export default class Renderer {
  private canvas: Canvas
  private drawers: Map<string, Drawer> = new Map()

  constructor(ref: HTMLCanvasElement, params: CanvasParams) {
    this.canvas = new Canvas(ref, params)
  }

  public render(entity: Entity): void {
    const { position, form } = entity

    if (this.isPrimitive(form)) {
      const drawer = this.getDrawer('PrimitivesDrawer') as PrimitivesDrawer

      switch (form) {
        case 'rect':
          drawer.rect(position, entity.params as IRect)
          break
        case 'circle':
          drawer.arc(position, entity.params as ICircleArc)
          break
      }
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

  private isPrimitive(form: EntityFormType): boolean {
    return Primitives.includes(form)
  }

  private hasDrawer(name: string): boolean {
    return this.drawers.has(name) && this.drawers.get(name) !== undefined
  }

  public setSize(w: number = 0, h: number = 0): void {
    this.canvas.setSize(w, h)
  }

  public get c2d(): CanvasRenderingContext2D {
    return this.canvas.c2d
  }
}
