export interface IPoint2 {
  x: number
  y: number
}

export interface Size {
  w: number
  h: number
}

export interface IRect extends Size {}

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
