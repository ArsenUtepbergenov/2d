import Compositor from './Compositor'
import GameRenderer from './GameRenderer'
import Player from './Player'
import { Move } from './SpriteEntity'
import World from './World'
import { setupPlayerKeyboard } from './input'

export default class Game {
  private parentElement: HTMLElement
  private compositor = new Compositor()
  private world = new World(this.compositor)
  private player = new Player(this.compositor)
  private renderer = new GameRenderer()
  private rafId: number = 0

  constructor(parent: HTMLElement) {
    this.parentElement = parent
    this.parentElement.appendChild(this.renderer.buffer)
    this.init()
  }

  private async init() {
    await this.world.load()
    await this.player.load()

    this.renderer.renderWorld(this.world)
    this.renderer.renderPlayer(this.player)

    this.player.addTrait(new Move())

    const input = setupPlayerKeyboard(this.player)
    input.listenTo()
  }

  public run(): void {
    this.update()
  }

  private update = () => {
    cancelAnimationFrame(this.rafId)

    const that = this

    const dTime = 1 / 60
    let lastTime = 0
    let accumulatedTime = 0

    function loop(time: number) {
      accumulatedTime += (time - lastTime) / 1000

      while (accumulatedTime > dTime) {
        // that.renderer.renderWorld(that.world)
        // that.player.update(dTime)
        // that.renderer.renderPlayer(that.player)

        accumulatedTime -= dTime
      }

      that.rafId = requestAnimationFrame(loop)
      lastTime = time
    }

    loop(0)
  }
}
