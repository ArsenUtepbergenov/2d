import { MatrixCallback } from '@/models/game'

export class Matrix<Type> {
  grid: Type[][] = []

  public forEach(callback: MatrixCallback<Type>) {
    this.grid.forEach((column, x) => {
      column.forEach((value, y) => {
        callback(value, x, y)
      })
    })
  }

  public set(x: number, y: number, value: Type) {
    if (!this.grid[x]) this.grid[x] = []
    this.grid[x][y] = value
  }

  public get(x: number, y: number) {
    const column = this.grid[x]
    if (column) return column[y]
  }

  public clear() {
    this.grid.length = 0
  }
}
