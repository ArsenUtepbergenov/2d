import { distanceTo } from '@/entities/math/common'
import Ball from '@/entities/physics/Ball'
import { Circle, Rectangle } from '@/models/types'

/**
 * The utility for checking collision.
 */
export abstract class Collider {
  public static collideBalls(ball1: Ball, ball2: Ball): void {
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

  public static checkCircleToCircle(circle1: Circle, circle2: Circle): boolean {
    const dx = circle1.x - circle2.x
    const dy = circle1.y - circle2.y
    const distance = dx * dx + dy * dy

    return (
      distance <= (circle1.radius + circle2.radius) * (circle1.radius + circle2.radius)
    )
  }

  public static checkRectToCircle(rect: Rectangle, circle: Circle): boolean {
    return (
      rect.x < circle.x + circle.radius &&
      rect.x + rect.w > circle.x - circle.radius &&
      rect.y < circle.y + circle.radius &&
      rect.y + rect.h > circle.y - circle.radius
    )
  }

  public static checkRectToRect(rect1: Rectangle, rect2: Rectangle): boolean {
    return (
      rect1.x < rect2.x + rect2.w &&
      rect1.x + rect1.w > rect2.x &&
      rect1.y < rect2.y + rect2.h &&
      rect1.y + rect1.h > rect2.y
    )
  }
}
