export function isFunction (func) {
  return (typeof func === 'function' || Object.prototype.toString.call(func) === '[object Function]')
}

export function snapToGrid (grid, pendingX, pendingY, scale = 1) {
  const [scaleX, scaleY] = typeof scale === 'number' ? [scale, scale] : scale
  const x = Math.round((pendingX / scaleX) / grid[0]) * grid[0]
  const y = Math.round((pendingY / scaleY) / grid[1]) * grid[1]
  return [x, y]
}

export function getSize (el) {
  const rect = el.getBoundingClientRect()

  return [
    parseInt(rect.width),
    parseInt(rect.height)
  ]
}

export function computeWidth (parentWidth, left, right) {
  return parentWidth - left - right
}

export function computeHeight (parentHeight, top, bottom) {
  return parentHeight - top - bottom
}

export function restrictToBounds (value, min, max) {
  if (min !== null && value < min) {
    return min
  }

  if (max !== null && max < value) {
    return max
  }

  return value
}

export function between (value, min, max) {
  return value >= min && value <= max
}

export function subtractPaddings (len, startPadding, endPadding) {
  return len - startPadding - endPadding
}

export function scaledDifference (value, opposite, scale) {
  return opposite * scale - value
}
