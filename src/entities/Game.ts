import Player from './Player'
import Renderer from './Renderer'
import MovePlayer from './traits/MovePlayer'
import { CanvasParams } from '@/models'
import { setupPlayerKeyboard } from './input'

export default class Game {
  private player: Player
  private renderer: Renderer
  private canvas: HTMLCanvasElement
  private c2d: CanvasRenderingContext2D

  constructor(ref: HTMLCanvasElement, params: CanvasParams) {
    this.canvas = ref
    this.canvas.focus()
    this.renderer = new Renderer(ref, params)
    this.c2d = this.renderer.c2d
    this.player = new Player()
  }

  public run(): void {
    this.player.addTrait(new MovePlayer())

    const input = setupPlayerKeyboard(this.player)
    input.listenTo(this.canvas)
  }
}
