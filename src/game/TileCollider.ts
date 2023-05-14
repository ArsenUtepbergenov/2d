import { Tile, TileByIndex } from '@/models/game'
import { Matrix } from '../entities/math/Matrix'
import SpriteEntity from './SpriteEntity'
import TileResolver from './TileResolver'
import { wall } from './tiles/wall'

type Handlers = {
  [key: string]: ((entity: SpriteEntity, match: TileByIndex) => void)[]
}

const handlers: Handlers = {
  wall,
}

export default class TileCollider {
  public tileResolver: TileResolver

  constructor(tileMatrix: Matrix<Tile>) {
    this.tileResolver = new TileResolver(tileMatrix)
  }

  public checkX(entity: SpriteEntity) {
    const vx = entity.velocity.x
    if (vx === 0) return

    let x = -1

    if (vx > 0) x = entity.bounds.right
    else if (vx < 0) x = entity.bounds.left

    const matches = this.tileResolver.searchByRange(
      x,
      x,
      entity.bounds.top,
      entity.bounds.bottom,
    )

    matches.forEach(match => this.handle(0, entity, match))
  }

  public checkY(entity: SpriteEntity) {
    const vy = entity.velocity.y
    if (vy === 0) return

    let y = -1

    if (vy > 0) y = entity.bounds.bottom
    else if (vy < 0) y = entity.bounds.top

    const matches = this.tileResolver.searchByRange(
      entity.bounds.left,
      entity.bounds.right,
      y,
      y,
    )

    matches.forEach(match => this.handle(1, entity, match))
  }

  private handle(index: number, entity: SpriteEntity, match: TileByIndex) {
    const hs = handlers[match.tile.type as string]

    if (hs) {
      hs[index](entity, match)
    }
  }
}
