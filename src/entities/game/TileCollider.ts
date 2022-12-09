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
      x = entity.x + entity.size.w
    } else if (entity.velocity.x < 0) {
      x = entity.x
    }

    const matches = this.tileResolver.searchByRange(
      x,
      x,
      entity.y,
      entity.y + entity.size.h,
    )

    matches.forEach(match => {
      if (match.tile.name === 'ground') {
        return
      }

      if (entity.velocity.x > 0) {
        if (entity.x + entity.size.w > match.x1) {
          entity.x = match.x1 - entity.size.w
          entity.velocity.x = 0
        }
      } else if (entity.velocity.x < 0) {
        if (entity.x < match.x2) {
          entity.x = match.x2
          entity.velocity.x = 0
        }
      }
    })
  }

  public checkY(entity: SpriteEntity) {
    if (entity.velocity.y === 0) return

    let y = -1

    if (entity.velocity.y > 0) {
      y = entity.y + entity.size.h
    } else if (entity.velocity.y < 0) {
      y = entity.y
    }

    const matches = this.tileResolver.searchByRange(
      entity.x,
      entity.x + entity.size.w,
      y,
      y,
    )

    matches.forEach(match => {
      if (match.tile.name === 'ground') {
        return
      }

      if (entity.velocity.y > 0) {
        if (entity.y + entity.size.h > match.y1) {
          entity.y = match.y1 - entity.size.h
          entity.velocity.y = 0
        }
      } else if (entity.velocity.y < 0) {
        if (entity.y < match.y2) {
          entity.y = match.y2
          entity.velocity.y = 0
        }
      }
    })
  }
}
