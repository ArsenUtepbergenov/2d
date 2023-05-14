export interface Point2 {
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

export type Rectangle = Point2 & IRect
export type Circle = Point2 & { radius: number }

export type EntityFormType = 'rect' | 'circle'

export interface IDrawable {
  draw(): void
}

export interface IUpdatable {
  update(): void
}
