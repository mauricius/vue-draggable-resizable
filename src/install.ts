import './components/vue-draggable-resizable.css'
import {App} from 'vue'

import VueDraggableResizable from './components/vue-draggable-resizable.vue'

let installed = false

export function install (Vue: App) {
  if (installed) return
  installed = true
  Vue.component('VueDraggableResizable', VueDraggableResizable)
}

const plugin = {
  install
}

let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = (global as any).Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}

export default VueDraggableResizable
