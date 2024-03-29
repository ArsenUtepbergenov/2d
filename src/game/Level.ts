import { GameContext, Tile } from '@/models/game'
import { Matrix } from '../entities/math/Matrix'
import Compositor from './Compositor'
import EntityCollider from './EntityCollider'
import SpriteEntity from './SpriteEntity'
import TileCollider from './TileCollider'

export default class Level {
  public compositor = new Compositor()
  public entities = new Set<SpriteEntity>()
  public tileCollider: TileCollider | null = null
  public entityCollider: EntityCollider

  constructor() {
    this.entityCollider = new EntityCollider(this.entities)
  }

  public setCollisionGrid(matrix: Matrix<Tile>) {
    this.tileCollider = new TileCollider(matrix)
  }

  public update(gameContext: GameContext) {
    this.entities.forEach(entity => {
      entity.update(gameContext, this)

      entity.position.x += entity.velocity.x
      this.tileCollider?.checkX(entity)

      entity.position.y += entity.velocity.y
      this.tileCollider?.checkY(entity)

      this.entityCollider.check(entity)
    })
  }
}
