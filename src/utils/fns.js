export function isFunction (func) {
  return typeof func === 'function' || Object.prototype.toString.call(func) === '[object Function]'
}
