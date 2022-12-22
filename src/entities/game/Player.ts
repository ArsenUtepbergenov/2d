import Config from '@/models/config'
import { C2D } from '@/models/game'
import BoundingBox from '../BoundingBox'
import Vector2 from '../math/Vector2'
import SpriteEntity from './SpriteEntity'
import SpriteSheet from './SpriteSheet'
import { goRight, goLeft, goDown, goUp, stands } from './animation'
import Killable from './entity-traits/Killable'
import Move from './entity-traits/Move'
import Shot from './entity-traits/Shot'
import Solid from './entity-traits/Solid'

export const createPlayer = createPlayerFactory()

function createPlayerFactory() {
  function currentFrame(player: Player): string {
    const dirX = player.move.directionX
    const dirY = player.move.directionY

    if (dirX !== 0) {
      const dX = player.move.distanceX
      return dirX > 0 ? goRight(dX) : goLeft(dX)
    }

    if (dirY !== 0) {
      const dY = player.move.distanceY
      return dirY > 0 ? goDown(dY) : goUp(dY)
    }

    return stands[player.move.heading]
  }

  return function create() {
    const p = Player.get()

    p.size = Config.PLAYER_SIZE
    p.offset = Config.PLAYER_OFFSET
    p.position = Config.PLAYER_START_POSITION
    p.velocity = new Vector2(0, 0)
    p.bounds = new BoundingBox(p.position, p.size, p.offset)
    p.applyRouteFrame(currentFrame)
    p.addTrait(new Move())
    p.addTrait(new Killable())
    p.addTrait(new Solid())
    p.addTrait(new Shot())
    return p
  }
}

export class Player extends SpriteEntity {
  public sprite: SpriteSheet | null = null
  private currentFrame: ((player: Player) => string) | null = null

  private static instance: Player
  public static get() {
    if (!this.instance) this.instance = new Player()
    return this.instance
  }
  private constructor() {
    super()
  }

  public applyRouteFrame(fn: (player: Player) => string): void {
    this.currentFrame = fn
  }

  public draw(context: C2D): void {
    this.sprite?.draw(context, this.currentFrame!(this), 0, 0)
  }
}
