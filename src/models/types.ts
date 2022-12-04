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

export type EntityFormType = 'rect' | 'circle'

export interface IDrawable {
  draw(): void
}

export interface ITrait {
  readonly name: string
  update(): void
}
