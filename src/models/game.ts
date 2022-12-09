export type C2D = CanvasRenderingContext2D

export type Background = {
  tile: string
  ranges: number[][]
}

export type LayerCallback = {
  (context: C2D): void
}

export type Tile = { name: string }
export type TileByIndex = {
  tile: Tile
  x1: number
  x2: number
  y1: number
  y2: number
}

export type MatrixCallback<Type> = {
  (value: Type, x: number, y: number): void
}
