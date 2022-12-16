import { Tile } from '@/models/game'
import { Matrix } from '../math/Matrix'
import SpriteEntity from './SpriteEntity'
import TileResolver from './TileResolver'

export default class TileCollider {
  public tileResolver: TileResolver

  constructor(tileMatrix: Matrix<Tile>) {
    this.tileResolver = new TileResolver(tileMatrix)
  }

  public checkX(entity: SpriteEntity) {
    if (entity.velocity.x === 0) return

    let x = -1

    if (entity.velocity.x > 0) {
      x = entity.bounds.right
    } else if (entity.velocity.x < 0) {
      x = entity.bounds.left
    }

    const matches = this.tileResolver.searchByRange(
      x,
      x,
      entity.bounds.top,
      entity.bounds.bottom,
    )

    matches.forEach(match => {
      if (match.tile.type !== 'wall') return

      if (entity.velocity.x > 0) {
        if (entity.bounds.right > match.x1) {
          entity.bounds.left = match.x1 - entity.size.w
          entity.velocity.x = 0
        }
      } else if (entity.velocity.x < 0) {
        if (entity.bounds.left < match.x2) {
          entity.bounds.left = match.x2
          entity.velocity.x = 0
        }
      }
    })
  }

  public checkY(entity: SpriteEntity) {
    if (entity.velocity.y === 0) return

    let y = -1

    if (entity.velocity.y > 0) {
      y = entity.bounds.bottom
    } else if (entity.velocity.y < 0) {
      y = entity.bounds.top
    }

    const matches = this.tileResolver.searchByRange(
      entity.bounds.left,
      entity.bounds.right,
      y,
      y,
    )

    matches.forEach(match => {
      if (match.tile.type !== 'wall') return

      if (entity.velocity.y > 0) {
        if (entity.bounds.bottom > match.y1) {
          entity.bounds.top = match.y1 - entity.size.h
          entity.velocity.y = 0
        }
      } else if (entity.velocity.y < 0) {
        if (entity.bounds.top < match.y2) {
          entity.bounds.top = match.y2
          entity.velocity.y = 0
        }
      }
    })
  }
}
