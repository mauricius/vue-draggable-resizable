export function isFunction (func) {
  return typeof func === 'function' || Object.prototype.toString.call(func) === '[object Function]'
}

export function isNumber(val) {
  return typeof val === 'number'
}

