import Entity from '@/entities/physics/Entity'
import { Sides } from './enums'

export interface IPoint2 {
  x: number
  y: number
}

export interface ISize {
  w: number
  h: number
}

export interface IRect extends ISize {}

export interface ICircleArc {
  radius: number
  startAngle?: number
  endAngle?: number
  counterclockwise?: boolean
}

export type Rectangle = IPoint2 & IRect
export type Circle = IPoint2 & { r: number }

export type EntityFormType = 'rect' | 'circle'

export interface IDrawable {
  draw(): void
}

export interface ITrait {
  name: string
  obstruct(entity: Entity, side: Sides): void
}
