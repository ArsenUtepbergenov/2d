import Renderer from './Renderer'
import Vector from './math/Vector'
import Particle, { getParticle } from './physics/Particles'
import PrimitivesDrawer from './drawers/PrimitivesDrawer'
import { CS, System } from '@/utils'
import { Colors } from '@/models/enums'
import { CanvasParams } from '@/models'
import Utils from '@/utils/general'
import Locked from './physics/traits/Locked'

export default class Scene {
  private renderer: Renderer
  private drawerParams = {
    isCartesian: false,
    strokeStyle: Colors.green,
  }
  private particleParams = {
    x: CS.cX,
    y: CS.cY,
    w: System.CM,
    h: System.CM,
    radius: System.HCM,
    velocity: new Vector(3, -3),
  }
  private particles: Particle[] = []
  private c2d: CanvasRenderingContext2D

  constructor(ref: HTMLCanvasElement, params: CanvasParams) {
    this.renderer = new Renderer(ref, params)
    this.c2d = this.renderer.c2d
  }

  private update = () => {
    this.updateParticles()

    this.renderer.clear()
    this.renderParticles()

    requestAnimationFrame(this.update)
  }

  public show(): void {
    this.renderer.applyDrawer(new PrimitivesDrawer(this.c2d, this.drawerParams))
    const { x, y } = Utils.getRandomPositionInsideArea(
      { w: System.CM, h: System.CM },
      this.renderer.rect,
    )
    this.particleParams.x = x
    this.particleParams.y = y
    const particle = getParticle(this.particleParams)
    particle.addTrait(new Locked())

    this.particles.push(particle)
    this.update()
  }

  private updateParticles(): void {
    this.particles.forEach(p => p.update())
  }

  private renderParticles(): void {
    this.particles.forEach(p => this.renderer.render(p))
  }

  public setSize(w: number = 0, h: number = 0): void {
    this.renderer.setSize(w, h)
  }
}
