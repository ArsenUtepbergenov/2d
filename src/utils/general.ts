import { Rectangle, Circle, ISize } from './../models/types'
/**
 * The general utilities.
 */
export default class Utils {
  public static div(numerator: number, denominator: number) {
    return (numerator - (numerator % denominator)) / denominator
  }

  public static randomIntByInterval(min: number, max: number) {
    return Math.floor(min + Math.random() * (max + 1 - min))
  }

  public static getRandomPositionInsideArea(
    objectSize: ISize,
    area: Rectangle,
  ) {
    const x = Utils.randomIntByInterval(
      area.x + objectSize.w / 2,
      area.w - objectSize.w / 2,
    )
    const y = Utils.randomIntByInterval(
      area.y + objectSize.h / 2,
      area.h - objectSize.h / 2,
    )

    return { x, y }
  }

  public static createMatrix(w: number, h: number) {
    const matrix: number[][] = []
    while (h--) matrix.push(new Array(w).fill(0))
    return matrix
  }

  public static collisionRectOfCircle(
    rect: Rectangle,
    circle: Circle,
  ): boolean {
    if (
      rect.x < circle.x + circle.r &&
      rect.x + rect.w > circle.x - circle.r &&
      rect.y < circle.y + circle.r &&
      rect.y + rect.h > circle.y - circle.r
    ) {
      return true
    }
    return false
  }

  public static collisionRectOfRect(
    firstRect: Rectangle,
    secondRect: Rectangle,
  ): boolean {
    if (
      firstRect.x < secondRect.x + secondRect.w &&
      firstRect.x + firstRect.w > secondRect.x &&
      firstRect.y < secondRect.y + secondRect.h &&
      firstRect.y + firstRect.h > secondRect.y
    ) {
      return true
    }
    return false
  }
}
