export type CanvasParams = {
  width: number
  height: number
  alpha?: boolean
}

export type DrawerParams = {
  isCartesian: boolean
  strokeStyle: string | CanvasGradient | CanvasPattern
  fillStyle: string | CanvasGradient | CanvasPattern
}

export type TextParams = {
  x: number
  y: number
  fillStyle?: string | CanvasGradient | CanvasPattern
  align?: CanvasTextAlign
}

export type CircleParams = {
  radius: number
  startAngle?: number
  endAngle?: number
  counterclockwise?: boolean | undefined
}

export type EventHandler =
  | ((this: GlobalEventHandlers, ev: Event) => any)
  | null
export type MouseEventHandler =
  | ((this: GlobalEventHandlers, ev: MouseEvent) => any)
  | null
export type KeyboardEventHandler =
  | ((this: GlobalEventHandlers, ev: KeyboardEvent) => any)
  | null
