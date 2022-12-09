import Level from '@/entities/game/Level'
import {
  createBackgroundLayer,
  createSpriteLayer,
} from '@/entities/game/layers'
import { loadBackgroundSprites } from '@/entities/game/sprites'
import { Config } from '@/models/enums'

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

export async function loadLevel() {
  const [backgrounds, spec] = await Promise.all([
    loadBackgroundSprites(),
    loadJSON(Config.WORLD),
  ])

  const level = new Level()

  level.compositor.layers.push(
    createBackgroundLayer(spec.backgrounds, backgrounds),
  )

  level.compositor.layers.push(createSpriteLayer(level.entities))

  return level
}
