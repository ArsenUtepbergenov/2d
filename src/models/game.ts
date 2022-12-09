export type C2D = CanvasRenderingContext2D

export type Background = {
  tile: string
  ranges: number[]
}

export type LayerCallback = {
  (context: C2D): void
}

export type MatrixCallback = {
  (value: { name: string }, x: number, y: number): void
}
