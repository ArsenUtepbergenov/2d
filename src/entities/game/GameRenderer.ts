import { Config } from '@/models/enums'
import Player from './Player'
import World from './World'

export default class GameRenderer {
  private mainBuffer: HTMLCanvasElement
  private mainContext: CanvasRenderingContext2D

  constructor() {
    this.mainBuffer = document.createElement('canvas')
    this.mainBuffer.width = Config.WORLD_WIDTH
    this.mainBuffer.height = Config.WORLD_HEIGHT
    this.mainBuffer.focus()
    this.mainContext = this.mainBuffer.getContext('2d')!
  }

  public renderPlayer(player: Player): void {
    player.draw(this.mainContext)
  }

  public renderWorld(world: World): void {
    world.draw(this.mainContext)
  }

  public get buffer(): HTMLCanvasElement {
    return this.mainBuffer
  }
}
