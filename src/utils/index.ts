import { ISize } from '@/models/types'
import { Point } from '@/entities/math/Point'

/**
 * The global system.
 */
export abstract class System {
  public static WIDTH = 32 * 24
  public static HEIGHT = 32 * 20

  public static CANVAS_HEIGHT = 700
  /**
   * The delay of window resizing.
   */
  public static RESIZE_TIME = 500 // ms
  /**
   * One centimeter = ~37.8px.
   */
  public static CM = 37.8
  /**
   * Half of one centimeter = ~19.9px.
   */
  public static HCM = 18.9
  /**
   * The length of arrowhead (for vectors, etc.).
   */
  public static ARROWHEAD = 7
  /**
   * Convert coordinate (x, y) to centimeters.
   * @param point the original coordinate (x, y)
   * @returns original coordinate (x, y) in centimeters
   */
  public static convertToCM({ x, y }: Point) {
    return { x: x * System.CM, y: y * System.CM }
  }
  /**
   * Get number centimeters.
   */
  public static getCMs(number: number): number {
    return number * System.CM
  }
}

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
