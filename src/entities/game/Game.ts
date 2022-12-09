import { loadLevel } from '@/utils/loaders'
import GameRenderer from './GameRenderer'
import Level from './Level'
import Player from './Player'
import Move from './entity-traits/Move'
import { setupPlayerKeyboard } from './input'

export default class Game {
  private parentElement: HTMLElement
  private level: Level | null = null
  private player = new Player()
  private renderer = new GameRenderer()
  private rafId: number = 0

  constructor(parent: HTMLElement) {
    this.parentElement = parent
    this.parentElement.appendChild(this.renderer.buffer)
    this.init()
  }

  private async init() {
    await this.player.load()
    this.level = await loadLevel()

    this.level.entities.add(this.player)

    this.level.compositor.draw(this.renderer.c2d)

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
        that.level?.update(dTime)
        that.level?.compositor.draw(that.renderer.c2d)
        accumulatedTime -= dTime
      }

      that.rafId = requestAnimationFrame(loop)
      lastTime = time
    }

    loop(0)
  }
}
