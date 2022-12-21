import { Sides } from '@/models/enums'
import { TileByIndex } from '@/models/game'
import SpriteEntity from '../SpriteEntity'
import EntityTrait, { IObstructable } from './EntityTrait'

export default class Solid extends EntityTrait implements IObstructable {
  public name = 'solid'

  public obstruct(entity: SpriteEntity, side: Sides, match: TileByIndex): void {
    if (side === Sides.BOTTOM) {
      entity.bounds.bottom = match.y1
      entity.velocity.y = 0
    } else if (side === Sides.TOP) {
      entity.bounds.top = match.y2
      entity.velocity.y = 0
    } else if (side === Sides.RIGHT) {
      entity.bounds.right = match.x1
      entity.velocity.x = 0
    } else if (side === Sides.LEFT) {
      entity.bounds.left = match.x2
      entity.velocity.x = 0
    }
  }
}
