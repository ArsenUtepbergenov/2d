import { Tile } from '@/models/game'
import { Matrix } from '../math/Matrix'
import Compositor from './Compositor'
import SpriteEntity from './SpriteEntity'
import TileCollider from './TileCollider'

export default class Level {
  public compositor = new Compositor()
  public entities = new Set<SpriteEntity>()
  public tiles = new Matrix<Tile>()
  public tileCollider = new TileCollider(this.tiles)

  constructor() {}

  public update(dTime: number) {
    this.entities.forEach(entity => {
      entity.update(dTime)

      entity.x += entity.velocity.x
      this.tileCollider.checkX(entity)

      entity.y += entity.velocity.y
      this.tileCollider.checkY(entity)
    })
  }
}
