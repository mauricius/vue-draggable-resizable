import { configure } from '@storybook/vue'

import Vue from 'vue'

import VueDraggableResizable from '../src/components/vue-draggable-resizable'
import '../src/components/vue-draggable-resizable.css'

Vue.component('vue-draggable-resizable', VueDraggableResizable)

function loadStories() {
  require('../stories')
}

configure(loadStories, module)