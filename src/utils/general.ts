import Vector2 from '@/entities/math/Vector2'
import { Rectangle, Size } from '@/models/types'

/**
 * The general utilities.
 */
export default abstract class Utils {
  public static getRandomBoolean(): boolean {
    return Math.random() < 0.5
  }

  public static getRandomColor(): string {
    return '#' + (0x1000000 + Math.random() * 0xffffff).toString(16).substring(1, 7)
  }

  public static getRandomRad() {
    return Math.random() * (Math.PI * 2)
  }

  public static getRandomIntByInterval(min: number, max: number) {
    return Math.floor(min + Math.random() * (max + 1 - min))
  }

  public static getRandomVector2(min: number = 0, max: number = 1): Vector2 {
    const x = Utils.getRandomIntByInterval(min, max)
    const y = Utils.getRandomIntByInterval(min, max)
    return new Vector2(x, y)
  }

  public static getRandomPositionInsideArea(objectSize: Size, area: Rectangle) {
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

  public static getMouseCoordinates(event: MouseEvent) {
    const target = event.target as HTMLElement
    const rect = target.getBoundingClientRect()

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
  }
}
