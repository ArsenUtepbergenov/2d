import { IPoint, ISize } from '@/models/types'

/**
 * The global system
 */
export abstract class System {
  public static RESIZE_TIME = 500 // ms
  public static CM = 37.8 // One centimeter = ~37.8px
  public static HCM = 18.9 // Half of centimeter = ~19.9px
  public static ARROWHEAD = 7 // The length of arrowhead (for vectors, etc.)

  public static convertToCm({ x, y }: IPoint) {
    return { x: x * System.CM, y: y * System.CM }
  }
}

/**
 * Coordinate system
 */
export abstract class CS {
  public static cX = 0
  public static cY = 0

  public static getCenter(): IPoint {
    return { x: CS.cX, y: CS.cY }
  }

  public static setCenter({ w, h }: ISize) {
    CS.cX = CS.getCenterOfAxis(CS.getCMs(w))
    CS.cY = CS.getCenterOfAxis(CS.getCMs(h))
  }

  private static getCMs(dimension: number) {
    return Math.floor(dimension / System.HCM / 2)
  }

  private static getCenterOfAxis(cms: number) {
    return cms * System.HCM
  }
}
