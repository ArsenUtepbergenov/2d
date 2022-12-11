import { ExpandedTile, Patterns, Tile } from '@/models/game'
import { Matrix } from '../math/Matrix'

export function createCollisionGrid(tiles: Tile[], patterns: Patterns) {
  const grid = new Matrix<Tile>()

  for (const { tile, x, y } of expandTiles(tiles, patterns)) {
    grid.set(x, y, {
      type: tile.type,
    })
  }

  return grid
}

export function createBackgroundGrid(tiles: Tile[], patterns: Patterns) {
  const grid = new Matrix<Tile>()

  for (const { tile, x, y } of expandTiles(tiles, patterns)) {
    grid.set(x, y, {
      name: tile.name,
    })
  }

  return grid
}

function* expandSpan(xStart: number, xLength: number, yStart: number, yLength: number) {
  const xEnd = xStart + xLength
  const yEnd = yStart + yLength

  for (let x = xStart; x < xEnd; ++x) {
    for (let y = yStart; y < yEnd; ++y) {
      yield { x, y }
    }
  }
}

function expandRange(range: number[]) {
  const length = range.length

  if (length === 4) {
    const [xStart, xLength, yStart, yLength] = range
    return expandSpan(xStart, xLength, yStart, yLength)
  } else if (length === 3) {
    const [xStart, xLength, yStart] = range
    return expandSpan(xStart, xLength, yStart, 1)
  } else if (length === 2) {
    const [xStart, yStart] = range
    return expandSpan(xStart, 1, yStart, 1)
  }
}

function* expandRanges(ranges: number[][] = []) {
  for (const range of ranges) {
    for (const item of expandRange(range)!) {
      yield item
    }
  }
}

function expandTiles(tiles: Tile[], patterns: Patterns) {
  const expandedTiles: ExpandedTile[] = []

  function walkTiles(tiles: Tile[], offsetX: number, offsetY: number) {
    for (const tile of tiles) {
      for (const { x, y } of expandRanges(tile.ranges)) {
        const derivedX = x + offsetX
        const derivedY = y + offsetY

        if (tile.pattern) {
          walkTiles(patterns[tile.pattern].tiles, derivedX, derivedY)
        } else {
          expandedTiles.push({
            tile,
            x: derivedX,
            y: derivedY,
          })
        }
      }
    }
  }

  walkTiles(tiles, 0, 0)

  return expandedTiles
}
