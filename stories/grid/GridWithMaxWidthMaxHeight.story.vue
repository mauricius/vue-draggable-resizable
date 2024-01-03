<script>
import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'
import '@/components/vue-draggable-resizable.css'

import { defineComponent } from 'vue'

const baseStyle = {
  position: 'relative',
  backgroundColor: '#808080',
  background: 'linear-gradient(-90deg, rgba(0, 0, 0, .1) 1px, transparent 1px), linear-gradient(rgba(0, 0, 0, .1) 1px, transparent 1px)',
  backgroundSize: '20px 40px, 20px 40px',
  backgroundPosition: '10px 20px',
  height: '100vh'
}

export default defineComponent({
  components: {
    VueDraggableResizable,
  },
  data () {
    return {
      grid: [20, 40],
      x: 10,
      y: 20,
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
  <Story auto-props-disabled title="Grid with Max Width and Max Height">
    <div :style="style">
      <vue-draggable-resizable :grid="grid" :x="x" :y="y" :maxWidth="maxWidth" :maxHeight="maxHeight">
        <p>Grid {{ grid[0] }}x{{ grid[1] }} starting with a {{ x }}x{{ y }} offset and max width equal to {{ maxWidth }} and max height equal to {{ maxHeight }}.</p>
      </vue-draggable-resizable>
      <div style="border: 1px solid #ff9a9a; height: 290px; width: 290px; top: 20px; left: 10px; position: relative; box-sizing: border-box; z-index: -1;"></div>
    </div>
  </Story>
</template>

<docs lang="md">
  ## Grid 20x40 pixels with 10x10 offset and maxHeight, maxWidth values

  If you provide `:max-height` and `:max-width` values that are higer than the respective grid values, you can notice that resizing stops to the lower suitable value. For example on the x axis the lowest valid value that respects max width and grid[x] constraint is `80`. The same applies for the y axis.
</docs>
