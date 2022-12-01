export interface ISize {
  w: number
  h: number
}

export interface IRect {
  x: number
  y: number
  w: number
  h: number
}

export interface IVector2 {
  x: number
  y: number
}

export interface IFillCircle {
  position: IVector2
  radius: number
  color?: string
}

export interface IFillRect extends IRect {
  color?: string
}
