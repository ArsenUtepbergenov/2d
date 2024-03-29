import Vector2 from '@/entities/math/Vector2'

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

export type EventHandler = ((this: GlobalEventHandlers, ev: Event) => any) | null
export type MouseEventHandler =
  | ((this: GlobalEventHandlers, ev: MouseEvent) => any)
  | null
export type KeyboardEventHandler =
  | ((this: GlobalEventHandlers, ev: KeyboardEvent) => any)
  | null

export type EntityParams = {
  x: number
  y: number
  w?: number
  h?: number
  radius?: number
  velocity: Vector2
  acceleration: Vector2
  speed: number
  direction: number
  mass: number
  mode: 'fill' | 'stroke'
  style: string | CanvasGradient | CanvasPattern
  alpha: number
}

export type ParticleParams = Omit<Required<EntityParams>, 'w' | 'h'>
export type BoxParams = Omit<Required<EntityParams>, 'radius'>
export type BallParams = {
  x: number
  y: number
  radius: number
  velocity: Vector2
  acceleration: Vector2
  mass: number
}

export type StyleParams = {
  mode: 'fill' | 'stroke'
  style: string | CanvasGradient | CanvasPattern
  alpha: number
}
