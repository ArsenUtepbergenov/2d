import { loadLevel, loadPlayer } from '@/entities/game/loaders'
import Camera from './Camera'
import GameRenderer from './GameRenderer'
import Level from './Level'
import { Player, createPlayer } from './Player'
import { setupPlayerKeyboard } from './input'
import { createCollisionLayer } from './layers'

export default class Game {
  private parentElement: HTMLElement
  private level: Level | null = null
  private player: Player
  private renderer = new GameRenderer()
  private dTime = 1 / 60
  private lastTime = 0
  private accumulatedTime = 0
  private camera = new Camera()

  constructor(parent: HTMLElement) {
    this.parentElement = parent
    this.parentElement.appendChild(this.renderer.buffer)
    this.player = createPlayer()
  }

  private async init() {
    const [playerSprite, level] = await Promise.all([loadPlayer(), loadLevel()])

    this.player.sprite = playerSprite
    this.level = level

    this.level.entities.add(this.player)

    const input = setupPlayerKeyboard(this.player)
    input.listenTo()

    this.level.compositor.layers.push(createCollisionLayer(this.level))
  }

  public async run() {
    await this.init()
    this.update(0)
  }

  private update = (time: number) => {
    if (!this.level) return

    this.accumulatedTime += (time - this.lastTime) / 1000

    if (this.accumulatedTime > 1) this.accumulatedTime = 1

    while (this.accumulatedTime > this.dTime) {
      this.level.update(this.dTime)

      if (this.player.position.x > 100) {
        this.camera.position.x = this.player.position.x - 100
      }

      this.level.compositor.draw(this.renderer.c2d, this.camera)
      this.accumulatedTime -= this.dTime
    }

    requestAnimationFrame(this.update)
    this.lastTime = time
  }
}
