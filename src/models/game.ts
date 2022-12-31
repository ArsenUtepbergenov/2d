import Camera from '@/game/Camera'

export type C2D = CanvasRenderingContext2D

export type Patterns = Record<string, Record<string, Tile[]>>

export type LayerCallback = {
  (context: C2D, camera: Camera): void
}

export type ExpandedTile = {
  tile: Tile
  x: number
  y: number
}

export type FrameSpec = { name: string; rect: number[] }
export type TileSpec = { name: string; index: number[] }
export type Tile = {
  name?: string
  type?: string
  pattern?: string
  ranges?: number[][]
}
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

export type GameContext = {
  dTime: number
  audioContext: AudioContext
}
