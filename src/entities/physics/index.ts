import { BoxParams, ParticleParams, StyleParams } from '@/models'
import { System } from '@/models/system'
import { Rectangle } from '@/models/types'
import Utils from '@/utils/general'
import Vector2 from '../math/Vector2'
import Ball from './Ball'
import Box from './Box'
import Particle from './Particle'

export function createBall(x = 0, y = 0, radius = 0): Ball {
  const r = radius || Utils.getRandomIntByInterval(15, 40)
  const params = {
    x,
    y,
    radius: r,
    velocity: new Vector2(0, 0),
    acceleration: new Vector2(0, 0),
    mass: r,
  }
  const styles: StyleParams = {
    style: Utils.getRandomColor(),
    alpha: 1,
    mode: 'fill',
  }
  return new Ball(params, styles)
}

export function getRandomParticle(areaRect: Rectangle): Particle {
  const size = Utils.getRandomIntByInterval(System.HCM, System.CM)
  const { x, y } = Utils.getRandomPositionInsideArea({ w: size, h: size }, areaRect)
  const params: ParticleParams = {
    x,
    y,
    radius: Utils.getRandomIntByInterval(System.HCM, System.CM),
    velocity: new Vector2(0, 0),
    acceleration: new Vector2(0, 0),
    speed: 3,
    direction: Math.random() * (Math.PI * 2),
    mass: 0,
    mode: 'fill',
    style: Utils.getRandomColor(),
    alpha: 1,
  }

  return new Particle(params)
}

export function getRandomBox(areaRect: Rectangle): Box {
  const size = Utils.getRandomIntByInterval(System.HCM, System.CM)
  const { x, y } = Utils.getRandomPositionInsideArea({ w: size, h: size }, areaRect)
  const params: BoxParams = {
    x,
    y,
    w: size,
    h: size,
    velocity: new Vector2(0, 0),
    acceleration: new Vector2(0, 0),
    speed: 3,
    direction: Math.random() * (Math.PI * 2),
    mass: 0,
    mode: 'fill',
    style: Utils.getRandomColor(),
    alpha: 1,
  }

  return new Box(params)
}
