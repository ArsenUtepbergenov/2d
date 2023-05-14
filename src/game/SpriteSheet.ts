import Config from '@/models/config'
import { C2D } from '@/models/game'

export default class SpriteSheet {
  public image: HTMLImageElement
  public width: number
  public height: number
  public tiles: Map<string, HTMLCanvasElement>

  constructor(image: HTMLImageElement, width: number = 0, height: number = 0) {
    this.image = image
    this.width = width
    this.height = height
    this.tiles = new Map()
  }

  public define(name: string, ...[x, y, width, height]: number[]): void {
    const buffer = document.createElement('canvas')
    buffer.width = width
    buffer.height = height

    const context = buffer.getContext('2d')!

    context.drawImage(this.image, x, y, width, height, 0, 0, width, height)

    this.tiles.set(name, buffer)
  }

  public defineTile(name: string, ...[x, y]: number[]) {
    this.define(name, x * this.width, y * this.height, this.width, this.height)
  }

  public draw(context: C2D, name: string, x: number, y: number) {
    if (!name) return
    const buffer = this.tiles.get(name)
    if (buffer) context.drawImage(buffer, x, y)
  }

  public drawTile(context: C2D, name: string = '', x: number, y: number): void {
    this.draw(context, name, x * Config.TILE_SIZE, y * Config.TILE_SIZE)
  }
}
