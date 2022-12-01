export interface IRect {
  x: number
  y: number
  w: number
  h: number
}

export interface IVec2 {
  x: number
  y: number
}

export interface IFillCircle {
  position: IVec2
  radius: number
  color?: string
}

export interface IFillRect extends IRect {
  color?: string
}
