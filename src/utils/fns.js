export function isFunction (func) {
  return (typeof func === 'function' || Object.prototype.toString.call(func) === '[object Function]')
}

export function snapToGrid (grid, pendingX, pendingY, scaleX, scaleY) {
  // if both set scaleX and scaleY
  if (scaleX !== undefined && scaleY !== undefined) {
    const x = Math.round((pendingX / scaleX) / grid[0]) * grid[0]
    const y = Math.round((pendingY / scaleY) / grid[1]) * grid[1]
    return [x, y]
  }
  // compatiable with previous version (single scale value)
  if (scaleX === undefined) scaleX = 1
  const x = Math.round((pendingX / scaleX) / grid[0]) * grid[0]
  const y = Math.round((pendingY / scaleX) / grid[1]) * grid[1]
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
