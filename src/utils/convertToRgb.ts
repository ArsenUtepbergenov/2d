export function convertToRgb(hexCode: string) {
  try {
    if (hexCode.length !== 6) {
      throw new Error('Only six-digit hex colors are allowed.')
    }

    const rgbArray = hexCode.match(/.{1,2}/g)

    if (!rgbArray?.length) {
      throw new Error('No matches are found.')
    }

    return {
      r: parseInt(rgbArray[0], 16),
      g: parseInt(rgbArray[1], 16),
      b: parseInt(rgbArray[2], 16),
    }
  } catch (error) {
    console.error(error)
    return
  }
}
