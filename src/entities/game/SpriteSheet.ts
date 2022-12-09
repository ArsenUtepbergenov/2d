import { C2D } from '@/models/game'

export default class SpriteSheet {
  public image: HTMLImageElement
  public width: number
  public height: number
  public tiles: Map<string, HTMLCanvasElement[]>

  constructor(image: HTMLImageElement, width: number, height: number) {
    this.image = image
    this.width = width
    this.height = height
    this.tiles = new Map()
  }

  public define(
    name: string,
    x: number,
    y: number,
    width: number,
    height: number,
  ): void {
    const buffers = [false, true].map(flip => {
      const buffer = document.createElement('canvas')
      buffer.width = width
      buffer.height = height

      const context = buffer.getContext('2d')!

      if (flip) {
        context.scale(-1, 1)
        context.translate(-width, 0)
      }

      context.drawImage(this.image, x, y, width, height, 0, 0, width, height)

      return buffer
    })

    this.tiles.set(name, buffers)
  }

  public defineTile(name: string, x: number, y: number) {
    this.define(name, x * this.width, y * this.height, this.width, this.height)
  }

  public draw(context: C2D, name: string, x: number, y: number, flip = false) {
    const buffer = this.tiles.get(name)![flip ? 1 : 0]
    context.drawImage(buffer, x, y)
  }

  public drawTile(context: C2D, name: string, x: number, y: number): void {
    this.draw(context, name, x * 32, y * 32)
  }
}
