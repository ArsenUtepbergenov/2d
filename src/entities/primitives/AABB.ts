import { ISize } from '@/models/types'
import Point from './Point'

/**
 * Axis-aligned bounding box
 */
export default class AABB {
  private center = new Point()
  private size: ISize = { w: 0, h: 0 }

  constructor() {
    console.log(this.center)
    console.log(this.size)
  }
}
