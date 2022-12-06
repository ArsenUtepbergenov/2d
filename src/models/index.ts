import Vector from '@/entities/math/Vector'

export type CanvasParams = {
  w: number
  h: number
  alpha?: boolean
}

export type DrawerParams = {
  isCartesian: boolean
  strokeStyle: string | CanvasGradient | CanvasPattern
  fillStyle: string | CanvasGradient | CanvasPattern
  globalAlpha: 1
}

export type TextParams = {
  x: number
  y: number
  fillStyle?: string | CanvasGradient | CanvasPattern
  align?: CanvasTextAlign
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

export type EntityParams = {
  x: number
  y: number
  w: number
  h: number
  radius: number
  velocity: Vector
  acceleration: Vector
  mode: 'fill' | 'stroke'
  style: string | CanvasGradient | CanvasPattern
  alpha: number
}

export type FormParams = Pick<
  EntityParams,
  'w' | 'h' | 'radius' | 'mode' | 'style' | 'alpha'
>
