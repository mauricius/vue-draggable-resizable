export function isFunction (func: any) {
  return (typeof func === 'function' || Object.prototype.toString.call(func) === '[object Function]')
}

export function snapToGrid (grid: number[], pendingX: number, pendingY: number, scale: number | number[] = 1) {
  const [scaleX, scaleY] = typeof scale === 'number' ? [scale, scale] : scale
  const x = Math.round((pendingX / scaleX) / grid[0]) * grid[0]
  const y = Math.round((pendingY / scaleY) / grid[1]) * grid[1]
  return [x, y]
}

export function getSize (el: Element) {
  const rect = el.getBoundingClientRect()

  return [
    // @ts-ignore
    parseInt(rect.width, 10),
    // @ts-ignore
    parseInt(rect.height, 10)
  ]
}

export function computeWidth (parentWidth: number, left: number, right: number) {
  return parentWidth - left - right
}

export function computeHeight (parentHeight: number, top: number, bottom: number) {
  return parentHeight - top - bottom
}

export function restrictToBounds (value: number, min : number | null, max: number | null) {
  if (min !== null && value < min) {
    return min
  }

  if (max !== null && max < value) {
    return max
  }

  return value
}
