import { Point } from './Point'

export default class Vector2 {
  public x: number
  public y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  public add(vector: Vector2): Vector2 {
    return new Vector2(this.x + vector.x, this.y + vector.y)
  }

  public addTo(vector: Vector2): void {
    this.x += vector.x
    this.y += vector.y
  }

  public set angle(value: number) {
    const length = this.length
    this.x = Math.cos(value) * length
    this.y = Math.sin(value) * length
  }

  public get angle(): number {
    return Math.atan2(this.y, this.x)
  }

  public get length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  public set length(value: number) {
    const angle = this.angle
    this.x = Math.cos(angle) * value
    this.y = Math.sin(angle) * value
  }

  public negateX(): void {
    this.x = -this.x
  }

  public negateY(): void {
    this.y = -this.y
  }

  public get xy(): Point {
    return { x: this.x, y: this.y }
  }
}
