import { CanvasParams } from '@/models'
import BallsLockedArea from './BallsLockedArea'
import PrimitiveRenderer from './PrimitiveRenderer'
import { createBall } from './physics'
import Ball from './physics/Ball'
import Entity from './physics/Entity'

export default class Scene {
  private element: HTMLCanvasElement
  private renderer: PrimitiveRenderer
  private entities: Entity[] = []
  private ballsLockedArea: BallsLockedArea
  private rafId: number = 0

  constructor(ref: HTMLCanvasElement, params: CanvasParams) {
    this.element = ref
    this.element.focus()
    this.renderer = new PrimitiveRenderer(ref, params)
    this.ballsLockedArea = new BallsLockedArea(this.renderer.rect)
    this.init()
  }

  public init(): void {
    const ball = createBall(300, 400, 30)
    ball.velocity.length = 7
    ball.velocity.angle = -Math.PI / 4
    this.entities.push(ball)
  }

  public freeze(): void {
    cancelAnimationFrame(this.rafId)
  }

  public unfreeze(): void {
    this.update()
  }

  private update = () => {
    cancelAnimationFrame(this.rafId)

    const that = this

    function loop() {
      that.renderer.clear()

      that.updateEntities()
      that.renderEntities()

      that.rafId = requestAnimationFrame(loop)
    }

    loop()
  }

  public show(): void {
    this.update()
  }

  private updateEntities(): void {
    this.entities.forEach(e => {
      this.ballsLockedArea.lock(e as Ball)
      e.update()
    })
  }

  private renderEntities(): void {
    this.entities.forEach(e => this.renderer.render(e))
  }

  public setSize(w: number = 0, h: number = 0): void {
    this.renderer.setSize(w, h)
  }
}
