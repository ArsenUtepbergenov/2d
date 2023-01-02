import { CanvasParams } from '@/models'
import Utils, { Collider } from '@/utils/general'
import BallsLockedArea from './BallsLockedArea'
import PrimitiveRenderer from './PrimitiveRenderer'
import { Point } from './math/Point'
import { distanceTo } from './math/common'
import { createBall } from './physics'
import Ball from './physics/Ball'
import Entity from './physics/Entity'

export default class Scene {
  private canvas: HTMLCanvasElement
  private renderer: PrimitiveRenderer
  private entities: Entity[] = []
  private ballsLockedArea: BallsLockedArea
  private rafId: number = 0

  constructor(ref: HTMLCanvasElement, params: CanvasParams) {
    this.canvas = ref
    this.canvas.focus()
    this.renderer = new PrimitiveRenderer(ref, params)
    this.ballsLockedArea = new BallsLockedArea(this.renderer.rect)
    this.init()
  }

  public handleClick = (e: MouseEvent) => {
    this.createBall(Utils.getMouseCoordinates(e))
  }

  public init(): void {
    this.canvas.onclick = this.handleClick
  }

  public createBall({ x, y }: Point): void {
    const ball = createBall(x, y)
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

  private checkBallsCollision(i: number): void {
    if (this.entities.length < 2) return

    const ball1 = this.entities[i] as Ball

    for (let j = i + 1; j < this.entities.length; j++) {
      const ball2 = this.entities[j] as Ball
      if (Collider.checkCircleToCircle(ball1, ball2)) {
        this.collideBalls(ball1, ball2)
      }
    }
  }

  private collideBalls(ball1: Ball, ball2: Ball) {
    const dx = ball2.x - ball1.x
    const dy = ball2.y - ball1.y
    const distance = distanceTo(dx, dy)

    const n = { x: dx / distance, y: dy / distance }
    const rv = {
      x: ball1.velocity.x - ball2.velocity.x,
      y: ball1.velocity.y - ball2.velocity.y,
    }

    const speed = n.x * rv.x + n.y * rv.y

    if (speed < 0) return

    const impulse = (2 * speed) / (ball1.mass + ball2.mass)

    ball1.velocity.x -= impulse * ball2.mass * n.x
    ball1.velocity.y -= impulse * ball2.mass * n.y
    ball2.velocity.x += impulse * ball1.mass * n.x
    ball2.velocity.y += impulse * ball1.mass * n.y

    ball1.velocity.y = ball1.velocity.y * ball1.elasticity
    ball2.velocity.y = ball2.velocity.y * ball2.elasticity
  }

  private updateEntities(): void {
    this.entities.forEach((e, i) => {
      e.update()
      this.ballsLockedArea.lock(e as Ball)
      this.checkBallsCollision(i)
    })
  }

  private renderEntities(): void {
    this.entities.forEach(e => this.renderer.render(e))
  }

  public setSize(w: number = 0, h: number = 0): void {
    this.renderer.setSize(w, h)
  }
}
