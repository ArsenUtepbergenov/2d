import { Config } from '@/models/enums'

export default class GameRenderer {
  private readonly mainBuffer: HTMLCanvasElement
  private readonly mainContext: CanvasRenderingContext2D

  constructor() {
    this.mainBuffer = document.createElement('canvas')
    this.mainBuffer.width = Config.WORLD_WIDTH
    this.mainBuffer.height = Config.WORLD_HEIGHT
    this.mainBuffer.focus()
    this.mainContext = this.mainBuffer.getContext('2d')!
  }

  public get buffer(): HTMLCanvasElement {
    return this.mainBuffer
  }

  public get c2d(): CanvasRenderingContext2D {
    return this.mainContext
  }
}
