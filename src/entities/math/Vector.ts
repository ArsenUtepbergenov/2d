import { Point } from './Point'
import { areEqual, toDegrees } from './common'

export default class Vector {
  private components: number[]

  constructor(...components: number[]) {
    this.components = components
  }

  public add({ components }: Vector): Vector {
    return new Vector(
      ...components.map(
        (component, index) => this.components[index] + component,
      ),
    )
  }

  public subtract({ components }: Vector): Vector {
    return new Vector(
      ...components.map(
        (component, index) => this.components[index] - component,
      ),
    )
  }

  public scaleBy(value: number): Vector {
    return new Vector(...this.components.map(component => component * value))
  }

  public length(): number {
    return Math.hypot(...this.components)
  }

  public dotProduct({ components }: Vector): number {
    return components.reduce(
      (result, component, index) => result + component * this.components[index],
      0,
    )
  }

  public normalize(): Vector {
    return this.scaleBy(1 / this.length())
  }

  private dotProductNormalizedWith(other: Vector): number {
    return this.normalize().dotProduct(other.normalize())
  }

  public haveSameDirectionWith(other: Vector): boolean {
    const dotProduct = this.dotProductNormalizedWith(other)
    return areEqual(dotProduct, 1)
  }

  public haveOppositeDirectionTo(other: Vector): boolean {
    const dotProduct = this.dotProductNormalizedWith(other)
    return areEqual(dotProduct, -1)
  }

  public isPerpendicularTo(other: Vector): boolean {
    const dotProduct = this.dotProductNormalizedWith(other)
    return areEqual(dotProduct, 0)
  }

  public angleBetween(other: Vector): number {
    return toDegrees(
      Math.acos(this.dotProduct(other) / (this.length() * other.length())),
    )
  }

  public negate(): Vector {
    return this.scaleBy(-1)
  }

  public projectOn(other: Vector): Vector {
    const normalized = other.normalize()
    return normalized.scaleBy(this.dotProduct(normalized))
  }

  public setLength(length: number): Vector {
    return this.normalize().scaleBy(length)
  }

  public equalTo({ components }: Vector): boolean {
    return components.every((component, index) =>
      areEqual(component, this.components[index]),
    )
  }

  public get xy(): Point {
    return { x: this.components[0], y: this.components[1] }
  }
}
