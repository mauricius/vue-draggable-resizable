import { isFunction } from './fns'

export function matchesSelectorToParentElements (el: Node, selector: string, baseNode: Node) {
  let node = el

  const matchesSelectorFunc = [
    'matches',
    'webkitMatchesSelector',
    'mozMatchesSelector',
    'msMatchesSelector',
    'oMatchesSelector'
  ].find(func => isFunction(node[func as keyof Node]))

  if (!isFunction(node[matchesSelectorFunc as keyof Node])) return false

  do {
    // @ts-ignore
    if (node[matchesSelectorFunc](selector)) return true
    if (node === baseNode) return false
      // @ts-ignore
    node = node.parentNode
  } while (node)

  return false
}

export function getComputedSize ($el: Element) {
  const style = window.getComputedStyle($el)

  return [
    parseFloat(style.getPropertyValue('width')),
    parseFloat(style.getPropertyValue('height'))
  ]
}

export function addEvent (el: EventTarget, event: string, handler: EventListenerOrEventListenerObject) {
  if (!el) {
    return
  }
  if ('attachEvent' in window) {
    // @ts-ignore
    el.attachEvent('on' + event, handler)
  } else if (el.addEventListener) {
    el.addEventListener(event, handler, true)
  } else {
    // @ts-ignore
    el['on' + event] = handler
  }
}

export function removeEvent (el: EventTarget, event: string, handler: EventListenerOrEventListenerObject) {
  if (!el) {
    return
  }
  if ('detachEvent' in window) {
    // @ts-ignore
    el.detachEvent('on' + event, handler)
  } else if (el.removeEventListener) {
    el.removeEventListener(event, handler, true)
  } else {
    // @ts-ignore
    el['on' + event] = null
  }
}
