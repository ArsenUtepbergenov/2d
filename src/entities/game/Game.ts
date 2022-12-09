import { loadLevel } from '@/entities/game/loaders'
import Camera from './Camera'
import GameRenderer from './GameRenderer'
import Level from './Level'
import Player, { createPlayer } from './Player'
import { setupMouseControl } from './debug'
import Move from './entity-traits/Move'
import { setupPlayerKeyboard } from './input'
import { createCameraLayer } from './layers'

export default class Game {
  private parentElement: HTMLElement
  private level: Level | null = null
  private player: Player | null = null
  private renderer = new GameRenderer()
  private rafId: number = 0
  private dTime = 1 / 60
  private lastTime = 0
  private accumulatedTime = 0
  private camera = new Camera()

  constructor(parent: HTMLElement) {
    this.parentElement = parent
    this.parentElement.appendChild(this.renderer.buffer)
  }

  private async init() {
    this.player = await createPlayer()
    this.level = await loadLevel()

    this.level.entities.add(this.player)
    this.player.addTrait(new Move())

    this.level.compositor.layers.push(createCameraLayer(this.camera))

    const input = setupPlayerKeyboard(this.player)
    input.listenTo()

    setupMouseControl(this.renderer.buffer, this.player, this.camera)
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
      this.level.compositor.draw(this.renderer.c2d, this.camera)
      this.accumulatedTime -= this.dTime
    }

    this.rafId = requestAnimationFrame(this.update)
    this.lastTime = time
  }
}
