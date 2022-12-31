import Config from '@/models/config'
import { C2D } from '@/models/game'
import SpriteSheet from '../SpriteSheet'
import { loadImage } from '../loaders'

const CHARS =
  ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'

export async function loadFont() {
  const img = await loadImage(Config.FONT_URL)

  const sprite = new SpriteSheet(img)

  const size = 8
  const rowLength = img.width
  for (const [index, char] of [...CHARS].entries()) {
    const x = (index * size) % rowLength
    const y = Math.floor((index * size) / rowLength) * size
    sprite.define(char, x, y, size, size)
  }

  return new Font(sprite, size)
}

export class Font {
  constructor(private sprite: SpriteSheet, private size: number) {
    this.sprite = sprite
    this.size = size
  }

  print(text: string, context: C2D, x: number, y: number) {
    ;[...text.toUpperCase()].forEach((char, pos) => {
      this.sprite.draw(context, char, x + pos * this.size, y)
    })
  }
}
