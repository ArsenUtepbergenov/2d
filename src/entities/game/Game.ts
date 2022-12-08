import Player from './Player'
import World from './World'
import GameRenderer from './GameRenderer'
import MovePlayer from '../traits/MovePlayer'
import Compositor from './Compositor'
// import { setupPlayerKeyboard } from './input'

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

    this.player.addTrait(new MovePlayer())

    // const input = setupPlayerKeyboard(this.player)
    // input.listenTo(this.canvas)
  }

  public run(): void {
    // this.update()
  }

  private update = () => {
    cancelAnimationFrame(this.rafId)

    const that = this

    function loop() {
      that.renderer.renderWorld(that.world)
      that.player.update()
      that.renderer.renderPlayer(that.player)

      that.rafId = requestAnimationFrame(loop)
    }

    loop()
  }
}
