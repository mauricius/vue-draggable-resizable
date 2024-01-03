<script>
import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'
import '@/components/vue-draggable-resizable.css'

import { defineComponent } from 'vue'

const baseStyle = {
    position: 'relative',
    backgroundColor: '#808080',
    background: 'linear-gradient(-90deg, rgba(0, 0, 0, .1) 1px, transparent 1px), linear-gradient(rgba(0, 0, 0, .1) 1px, transparent 1px)',
    backgroundSize: '20px 20px, 20px 20px',
    backgroundPosition: '10px 10px',
    height: '500px',
    width: '500px',
    border: '1px solid blue',
    margin: '1em',
    boxSizing: 'content-box'
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
  <Story auto-props-disabled title="Parent Grid with offset">
    <div :style="style">
      <vue-draggable-resizable :parent="true" :grid=[20,20] :x="10" :y="10" :h="400" :w="400">
        <p>You cannot move me or resize me outside my parent. And my edges cannot touch the parent element.</p>
      </vue-draggable-resizable>
    </div>
  </Story>
</template>

<docs lang="md">
  ## Component costraind in parent and on a grid with 10x10 offset

  Component attached to a grid with a small offset. Its starting position is not perfectly aligned with the top-left corner of the parent.
</docs>
