<script>
import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'
import '@/components/vue-draggable-resizable.css'

import { defineComponent } from 'vue'

const baseStyle = {
    position: 'relative',
    backgroundColor: '#808080',
    background: 'linear-gradient(-90deg, rgba(0, 0, 0, .1) 1px, transparent 1px), linear-gradient(rgba(0, 0, 0, .1) 1px, transparent 1px)',
    backgroundSize: '20px 20px, 20px 20px',
    height: '400px',
    width: '400px',
    border: '1px solid blue',
    margin: '1em'
}

export default defineComponent({
  components: {
    VueDraggableResizable,
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
  <Story auto-props-disabled title="Parent Grid">
    <div :style="style">
      <vue-draggable-resizable :parent="true" :grid=[20,20]>
        <p>You cannot move me or resize me outside my parent.</p>
      </vue-draggable-resizable>
    </div>
  </Story>
</template>

<docs lang="md">
  ## Component with grid costraind in parent

  Component attached to a grid, that cannot be dragged or resized outside its parent element, defined with the prop `:parent="true"`. In this case the size of the parent matches perfectly the grid.
</docs>
