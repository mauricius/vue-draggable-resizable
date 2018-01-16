export function matchesSelectorToParentElements (el, selector, baseNode) {
  let node = el
  do {
    if (node.matches(selector)) return true
    if (node === baseNode) return false
    node = node.parentNode
  } while (node)

  return false
}
