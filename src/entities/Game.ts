import Player from './Player'
import GameRenderer from './GameRenderer'
import MovePlayer from './traits/MovePlayer'
import { CanvasParams } from '@/models'
import { setupPlayerKeyboard } from './input'

export default class Game {
  private player: Player
  private renderer: GameRenderer
  private canvas: HTMLCanvasElement
  private rafId: number = 0

  constructor(ref: HTMLCanvasElement, params: CanvasParams) {
    this.canvas = ref
    this.canvas.focus()
    this.renderer = new GameRenderer(ref, params)
    this.player = new Player()
    this.init()
  }

  private init(): void {
    this.player.addTrait(new MovePlayer())

    const input = setupPlayerKeyboard(this.player)
    input.listenTo(this.canvas)
  }

  public run(): void {
    // this.update()
  }

  private update = () => {
    cancelAnimationFrame(this.rafId)

    const that = this

    function loop() {
      that.renderer.clear()

      that.player.update()
      that.renderer.renderPlayer(that.player)

      that.rafId = requestAnimationFrame(loop)
    }

    loop()
  }

  public setSize(w: number = 0, h: number = 0): void {
    this.renderer.setSize(w, h)
  }
}
