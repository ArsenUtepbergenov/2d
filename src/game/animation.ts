export function createAnimation(frames: string[], frameLength: number = 0.5) {
  return function resolveFrame(distance: number) {
    const frameIndex = Math.floor(distance / frameLength) % frames.length
    return frames[frameIndex]
  }
}

export const stands = ['stand-down', 'stand-left', 'stand-right', 'stand-up']
export const goRight = createAnimation(['go-right-1', 'go-right-2'])
export const goLeft = createAnimation(['go-left-1', 'go-left-2'])
export const goUp = createAnimation(['go-up-1', 'go-up-2'])
export const goDown = createAnimation(['go-down-1', 'go-down-2'])
