import { Point } from '@/entities/math/Point'

/**
 * The global system.
 */
export abstract class System {
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
