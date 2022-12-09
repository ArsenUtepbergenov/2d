import Level from '@/entities/game/Level'
import {
  createBackgroundLayer,
  createSpriteLayer,
} from '@/entities/game/layers'
import { loadBackgroundSprites } from '@/entities/game/sprites'
import { Config } from '@/models/enums'
import { Background } from '@/models/game'

export function loadImage(url: string) {
  return new Promise(resolve => {
    const image = new Image()
    image.addEventListener('load', () => {
      resolve(image)
    })
    image.src = url
  })
}

export async function loadJSON(url: string) {
  const r = await fetch(url)
  return await r.json()
}

function createTiles(level: Level, backgrounds: Background[]) {
  backgrounds.forEach((background: Background) => {
    const [x1, x2, y1, y2] = background.ranges

    for (let x = x1; x < x2; ++x) {
      for (let y = y1; y < y2; ++y) {
        level.tiles.set(x, y, {
          name: background.tile,
        })
      }
    }
  })
}

export async function loadLevel() {
  const [spec, backgroundSprites] = await Promise.all([
    loadJSON(Config.WORLD),
    loadBackgroundSprites(),
  ])

  const level = new Level()

  createTiles(level, spec.backgrounds)

  level.compositor.layers.push(createBackgroundLayer(level, backgroundSprites))

  level.compositor.layers.push(createSpriteLayer(level.entities))

  return level
}
