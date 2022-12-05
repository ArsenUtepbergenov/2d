import Vector from '@/entities/math/Vector'
import { Rectangle, Circle, ISize } from '@/models/types'

/**
 * The general utilities.
 */
export default abstract class Utils {
  public static div(numerator: number, denominator: number) {
    return (numerator - (numerator % denominator)) / denominator
  }

  public static getRandomBoolean(): boolean {
    return Math.random() < 0.5
  }

  public static getRandomColor(): string {
    return (
      '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substring(1, 7)
    )
  }

  public static getRandomIntByInterval(min: number, max: number) {
    return Math.floor(min + Math.random() * (max + 1 - min))
  }

  public static getRandomVector2(min: number = 0, max: number = 1): Vector {
    const x = Utils.getRandomIntByInterval(min, max)
    const y = Utils.getRandomIntByInterval(min, max)
    return new Vector(x, y)
  }

  public static getRandomPositionInsideArea(
    objectSize: ISize,
    area: Rectangle,
  ) {
    const x = Utils.getRandomIntByInterval(
      area.x + objectSize.w / 2,
      area.w - objectSize.w / 2,
    )
    const y = Utils.getRandomIntByInterval(
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
