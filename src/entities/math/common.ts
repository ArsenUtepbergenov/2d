export const EPSILON = 0.00000001

export const toDegrees = (radians: number) => (radians * 180) / Math.PI
export const toRadians = (degrees: number) => (degrees * Math.PI) / 180

export const areEqual = (
  one: number,
  other: number,
  epsilon = EPSILON,
): boolean => Math.abs(one - other) < epsilon

export function div(numerator: number, denominator: number): number {
  return (numerator - (numerator % denominator)) / denominator
}

export function distanceTo(dx: number, dy: number): number {
  return Math.sqrt(dx * dx + dy * dy)
}
