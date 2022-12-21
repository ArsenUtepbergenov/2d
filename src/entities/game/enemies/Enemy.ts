import BoundingBox from '@/entities/BoundingBox'
import Vector2 from '@/entities/math/Vector2'
import { C2D } from '@/models/game'
import SpriteEntity from '../SpriteEntity'
import SpriteSheet from '../SpriteSheet'
import { goRight, goLeft, stands } from '../animation'
import EntityTrait from '../entity-traits/EntityTrait'
import Killable from '../entity-traits/Killable'
import PendulumMove from '../entity-traits/PendulumMove'

export const createEnemy = createEnemyFactory()

function createEnemyFactory() {
  function currentFrame(enemy: Enemy): string {
    const dirX = enemy.pendulumMove.directionX

    if (dirX !== 0) {
      const dX = enemy.pendulumMove.distanceX
      return dirX > 0 ? goRight(dX) : goLeft(dX)
    }

    return stands[enemy.pendulumMove.heading]
  }

  return function create() {
    const e = new Enemy()

    e.size = { w: 28, h: 32 }
    e.offset = { x: 0, y: 0 }
    e.position = { x: 128, y: 128 }
    e.velocity = new Vector2(0, 0)
    e.bounds = new BoundingBox(e.position, e.size, e.offset)
    e.applyRouteFrame(currentFrame)
    e.addTrait(new PendulumMove())
    e.addTrait(new Behavior())
    e.addTrait(new Killable())
    return e
  }
}

class Behavior extends EntityTrait {
  public name = 'behavior'

  public collides(us: SpriteEntity, them: SpriteEntity): void {
    if (us.killable.isDead) return

    us.killable.kill()
    us.pendulumMove.speed = 0
  }
}

export class Enemy extends SpriteEntity {
  public sprite: SpriteSheet | null = null
  private currentFrame: ((enemy: Enemy) => string) | null = null

  constructor() {
    super()
  }

  public applyRouteFrame(fn: (enemy: Enemy) => string): void {
    this.currentFrame = fn
  }

  public draw(context: C2D): void {
    this.sprite?.draw(context, this.currentFrame!(this), 0, 0)
  }
}
