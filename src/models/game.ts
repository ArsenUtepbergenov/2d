export type Background = {
  tile: string
  ranges: number[]
}

export type LayerCallback = {
  (context: CanvasRenderingContext2D): void
}
