import { CanvasParams } from '@/models'
import Entities from '@/utils/entities'
import Renderer from './Renderer'
import PrimitivesDrawer from './drawers/PrimitivesDrawer'
import Entity from './physics/Entity'

export default class PrimitiveRenderer extends Renderer {
  constructor(ref: HTMLCanvasElement, params: CanvasParams) {
    super(ref, params)
  }

  public render(entity: Entity): void {
    if (Entities.isPrimitive(entity.form)) {
      this.renderPrimitive(entity)
    }
  }

  private renderPrimitive(entity: Entity): void {
    const drawer = this.getDrawer('PrimitivesDrawer') as PrimitivesDrawer
    const { position, form, formParams } = entity
    const { w, h, radius, mode, style, alpha } = formParams
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
}
