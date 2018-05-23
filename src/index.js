import VueDraggableResizable from './components'

const install = function (Vue, opts = {}) {
  Vue.component(VueDraggableResizable.name, VueDraggableResizable)
}

module.exports = {
  install,
  VueDraggableResizable
}

module.exports.default = module.exports
