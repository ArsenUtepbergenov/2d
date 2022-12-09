import Config from '@/models/config'
import { Tile, TileByIndex } from '@/models/game'
import { Matrix } from '../math/Matrix'

export default class TileResolver {
  constructor(
    private matrix: Matrix<Tile> = matrix,
    public tileSize = Config.TILE_SIZE,
  ) {}

  public toIndex(position: number) {
    return Math.floor(position / this.tileSize)
  }

  public toIndexRange(position1: number, position2: number) {
    const pMax = Math.ceil(position2 / this.tileSize) * this.tileSize
    const range = []
    let position = position1

    do {
      range.push(this.toIndex(position))
      position += this.tileSize
    } while (position < pMax)

    return range
  }

  public getByIndex(indexX: number, indexY: number): TileByIndex | undefined {
    const tile = this.matrix.get(indexX, indexY)

    if (tile) {
      const x1 = indexX * this.tileSize
      const x2 = x1 + this.tileSize
      const y1 = indexY * this.tileSize
      const y2 = y1 + this.tileSize
      return {
        tile,
        x1,
        x2,
        y1,
        y2,
      }
    }
  }

  public searchByPosition(x: number, y: number) {
    return this.getByIndex(this.toIndex(x), this.toIndex(y))
  }

  public searchByRange(x1: number, x2: number, y1: number, y2: number) {
    const matches: TileByIndex[] = []

    this.toIndexRange(x1, x2).forEach(indexX => {
      this.toIndexRange(y1, y2).forEach(indexY => {
        const match = this.getByIndex(indexX, indexY)

        if (match) matches.push(match)
      })
    })

    return matches
  }
}
