<script>
import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'
import '@/components/vue-draggable-resizable.css'

import { defineComponent } from 'vue'

const baseStyle = {
    position: 'relative',
    backgroundColor: '#808080',
    background: 'linear-gradient(-90deg, rgba(0, 0, 0, .1) 1px, transparent 1px), linear-gradient(rgba(0, 0, 0, .1) 1px, transparent 1px)',
    backgroundSize: '10px 20px, 10px 20px',
    height: '400px',
    width: '400px',
    border: '1px solid blue',
    margin: '1em'
}

export default defineComponent({
  components: {
    VueDraggableResizable,
  },
  data () {
    return {
      maxWidth: 290,
      maxHeight: 290
    }
  },
  computed: {
    style () {
      return {
        ...baseStyle
      }
    }
  }
})
</script>

<template>
  <Story auto-props-disabled title="Parent Grid with Max Width Max Height">
    <div :style="style">
      <vue-draggable-resizable :parent="true" :max-width="maxWidth" :max-height="maxHeight" :grid="[10,20]">
        <p>Component costrained in parent with <b>maxWidth</b> equal to {{ maxWidth }} and <b>maxHeight</b> equal to {{ maxHeight }}.</p>
      </vue-draggable-resizable>
    </div>

    <template #controls>
      <HstNumber v-model="maxWidth" :step="1" title="Max Width" />
      <HstNumber v-model="maxHeight" :step="1" title="Max Height" />
    </template>
  </Story>
</template>

<docs lang="md">
  ## Component with grid costraind in parent with maxWidth and maxHeight

  Component attached to a grid, that cannot be dragged or resized outside its parent element, with `:max-width` and `:max-height` props to limit its size. Notice that using `20` as grid prop for the y axis, the maximum height of the element is `280` instead of `290`.
</docs>
