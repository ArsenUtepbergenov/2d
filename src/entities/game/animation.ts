export function createAnimation(frames: string[], frameLength: number = 1) {
  return function resolveFrame(distance: number) {
    const frameIndex = Math.floor(distance / frameLength) % frames.length
    return frames[frameIndex]
  }
}
