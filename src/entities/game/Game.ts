import { loadLevel } from '@/utils/loaders'
import GameRenderer from './GameRenderer'
import Level from './Level'
import Player, { createPlayer } from './Player'
import Move from './entity-traits/Move'
import { setupPlayerKeyboard } from './input'

export default class Game {
  private parentElement: HTMLElement
  private level: Level | null = null
  private player: Player | null = null
  private renderer = new GameRenderer()
  private rafId: number = 0
  private dTime = 1 / 60
  private lastTime = 0
  private accumulatedTime = 0

  constructor(parent: HTMLElement) {
    this.parentElement = parent
    this.parentElement.appendChild(this.renderer.buffer)
  }

  private async init() {
    this.player = await createPlayer()
    this.level = await loadLevel()

    this.level.entities.add(this.player)

    this.level.compositor.draw(this.renderer.c2d)

    this.player.addTrait(new Move())

    const input = setupPlayerKeyboard(this.player)
    input.listenTo()
  }

  public async run() {
    cancelAnimationFrame(this.rafId)
    await this.init()
    this.update(0)
  }

  private update = (time: number) => {
    if (!this.level) return

    this.accumulatedTime += (time - this.lastTime) / 1000

    while (this.accumulatedTime > this.dTime) {
      this.level.update(this.dTime)
      this.level.compositor.draw(this.renderer.c2d)
      this.accumulatedTime -= this.dTime
    }

    this.rafId = requestAnimationFrame(this.update)
    this.lastTime = time
  }
}
