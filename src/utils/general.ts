import Vector2 from '@/entities/math/Vector2'
import { Rectangle, Circle, Size } from '@/models/types'

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

/**
 * The utility for checking collision.
 */
export abstract class Collider {
  public static checkCircleToCircle(circle1: Circle, circle2: Circle): boolean {
    const dx = circle1.x - circle2.x
    const dy = circle1.y - circle2.y
    const distance = dx * dx + dy * dy

    return (
      distance <= (circle1.radius + circle2.radius) * (circle1.radius + circle2.radius)
    )
  }

  public static checkRectToCircle(rect: Rectangle, circle: Circle): boolean {
    return (
      rect.x < circle.x + circle.radius &&
      rect.x + rect.w > circle.x - circle.radius &&
      rect.y < circle.y + circle.radius &&
      rect.y + rect.h > circle.y - circle.radius
    )
  }

  public static checkRectToRect(rect1: Rectangle, rect2: Rectangle): boolean {
    return (
      rect1.x < rect2.x + rect2.w &&
      rect1.x + rect1.w > rect2.x &&
      rect1.y < rect2.y + rect2.h &&
      rect1.y + rect1.h > rect2.y
    )
  }
}
