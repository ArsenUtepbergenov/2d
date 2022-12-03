import { Point } from '@/entities/math/Point'

export interface ISize {
  w: number
  h: number
}

export interface IRect {
  position: Point
  size: ISize
}

export interface ICircle {
  position: Point
  radius: number
}

export type IPrimitive = ICircle

export type TraitName = 'PhysicsTrait'

export interface ITrait {
  readonly name: TraitName
}
