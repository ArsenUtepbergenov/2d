import { Point } from '@/entities/math/Point'
import { System } from './system'
import { ISize } from './types'

/**
 * Coordinate system.
 */
export abstract class CS {
  /**
   * The CS's center on x.
   */
  public static cX = 0
  /**
   * The CS's center on y.
   */
  public static cY = 0
  /**
   * Get center of the coordinate system.
   * @returns center coordinate (x, y)
   */
  public static get center(): Point {
    return { x: CS.cX, y: CS.cY }
  }
  /**
   * Set center of the coordinate system by window's size.
   * @param size original size (width, height)
   */
  public static setCenter({ w, h }: ISize) {
    CS.cX = CS.getCenterOfAxis(CS.getNumberCMs(w))
    CS.cY = CS.getCenterOfAxis(CS.getNumberCMs(h))
  }
  /**
   * Get centimeters by size's attribute.
   * @param attribute size's attribute = width or height
   * @returns number centimeters
   */
  public static getNumberCMs(attribute: number): number {
    return Math.floor(attribute / System.CM)
  }
  /**
   * Get axis center by centimeters.
   * @param cms number centimeters
   */
  private static getCenterOfAxis(cms: number): number {
    return cms * System.HCM
  }
}
