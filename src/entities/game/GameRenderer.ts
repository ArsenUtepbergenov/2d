import Player from './Player'
import Renderer from '../Renderer'
import GameWorld from './GameWorld'
import { CanvasParams } from '@/models'

export default class GameRenderer extends Renderer {
  constructor(ref: HTMLCanvasElement, params: CanvasParams) {
    super(ref, params)
  }

  public renderPlayer(player: Player): void {
    console.log(player)
  }

  public renderWorld(world: GameWorld): void {
    world.draw(this.c2d)
  }
}
