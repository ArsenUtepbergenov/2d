export type CanvasParams = {
  width: number
  height: number
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
