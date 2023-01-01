import { Rectangle } from '@/models/types'
import Ball from './physics/Ball'

export default class BallsLockedArea {
  private rect: Rectangle

  constructor(rect: Rectangle) {
    this.rect = rect
  }

  public setRectArea(rect: Rectangle): void {
    this.rect = rect
  }

  public lock(ball: Ball): void {
    if (
      ball.bounds.right > this.rect.w ||
      ball.bounds.left < this.rect.x ||
      ball.bounds.bottom > this.rect.h ||
      ball.bounds.top < this.rect.y
    ) {
      ball.velocity.y *= ball.elasticity

      if (ball.bounds.right > this.rect.w) {
        ball.x = this.rect.w - ball.radius

        ball.velocity.negateX()
      } else if (ball.bounds.left < this.rect.x) {
        ball.x = this.rect.x + ball.radius

        ball.velocity.negateX()
      } else if (ball.bounds.bottom > this.rect.h) {
        ball.y = this.rect.h - ball.radius

        ball.velocity.negateY()
      } else if (ball.bounds.top < this.rect.y) {
        ball.y = this.rect.y + ball.radius

        ball.velocity.negateY()
      }
    }
  }
}
