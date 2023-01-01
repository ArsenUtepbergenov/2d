import { CanvasParams, FormParams } from '@/models'
import { Colors } from '@/models/enums'
import { EntityFormType } from '@/models/types'
import Entities from '@/utils/entities'
import Renderer from './Renderer'
import PrimitivesDrawer from './drawers/PrimitivesDrawer'
import { Point } from './math/Point'
import Entity from './physics/Entity'

export default class PrimitiveRenderer extends Renderer {
  private primitives = new Set<Entity>()
  private drawer: PrimitivesDrawer
  private params = {
    w: 0,
    h: 0,
    radius: 0,
  } as Required<FormParams>

  constructor(ref: HTMLCanvasElement, params: CanvasParams) {
    super(ref, params)
    this.applyDrawer(
      new PrimitivesDrawer(this.c2d, {
        isCartesian: false,
        fillStyle: Colors.green,
      }),
    )
    this.drawer = this.getDrawer('PrimitivesDrawer') as PrimitivesDrawer
  }

  public render(entity: Entity): void {
    const { form, position, formParams } = entity

    this.params = { ...formParams } as Required<FormParams>

    if (this.primitives.has(entity)) {
      this.renderByForm(form, position)
    }

    if (Entities.isPrimitive(form)) {
      this.drawer.setFillStyle(this.params.style)
      this.drawer.setStrokeStyle(this.params.style)
      this.drawer.setGlobalAlpha(this.params.alpha)

      this.renderByForm(form, position)

      this.primitives.add(entity)
    }
  }

  private renderByForm(form: EntityFormType, position: Point): void {
    switch (form) {
      case 'rect':
        this.renderRect(position)
        break
      case 'circle':
        this.renderCircle(position)
        break
    }
  }

  private renderRect(position: Point): void {
    this.drawer.rect(position, { w: this.params.w, h: this.params.h }, this.params.mode)
  }

  private renderCircle(position: Point): void {
    this.drawer.arc(position, { radius: this.params.radius }, this.params.mode)
  }
}
