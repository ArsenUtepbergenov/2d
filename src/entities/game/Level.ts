import { Tile } from '@/models/game'
import { Matrix } from '../math/Matrix'
import Compositor from './Compositor'
import SpriteEntity from './SpriteEntity'
import TileCollider from './TileCollider'

export default class Level {
  public compositor = new Compositor()
  public entities = new Set<SpriteEntity>()
  public tileCollider: TileCollider | null = null

  constructor() {}

  public setCollisionGrid(matrix: Matrix<Tile>) {
    this.tileCollider = new TileCollider(matrix)
  }

  public update(dTime: number) {
    this.entities.forEach(entity => {
      entity.update(dTime)

      entity.position.x += entity.velocity.x
      this.tileCollider?.checkX(entity)

      entity.position.y += entity.velocity.y
      this.tileCollider?.checkY(entity)
    })
  }
}
