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
      minWidth: 30,
      minHeight: 30
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
  <Story auto-props-disabled title="Grid with Min Width and Min Height">
    <div :style="style">
      <vue-draggable-resizable :grid="grid" :x="x" :y="y" :minWidth="minWidth" :minHeight="minHeight">
        <p>Grid {{ grid[0] }}x{{ grid[1] }} starting with a {{ x }}x{{ y }} offset and min width equal to {{ minWidth }} and min height equal to {{ minHeight }}.</p>
      </vue-draggable-resizable>
      <div style="border: 1px solid #ff9a9a; height: 30px; width: 30px; top: 20px; left: 10px; position: relative; box-sizing: border-box;"></div>
    </div>
  </Story>
</template>

<docs lang="md">
  ## Grid 20x40 pixels with 10x10 offset and minHeight, minWidth values

  If you provide `:min-height` and `:min-width` values that are lower than the respective grid values, you can notice that resizing stops to the lowest suitable value. For example on the x axis the lowest valid value that respects the min width and grid[x] constraint is `40`. The same applies for the y axis.
</docs>
