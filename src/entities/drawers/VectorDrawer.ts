import { Colors } from '@/models/enums'
import Drawer from './Drawer'
import Vector from '../math/Vector'
import { System } from '@/utils'

export default class VectorDrawer extends Drawer {
  constructor(c2d: CanvasRenderingContext2D) {
    super(c2d, { isCartesian: true, strokeStyle: Colors.green })
  }

  public draw2(vector: Vector): void {
    this.drawArrow(System.convertToCm(vector.xy))
  }
}
