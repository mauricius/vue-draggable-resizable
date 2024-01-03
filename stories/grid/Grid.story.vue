<script>
import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'
import '@/components/vue-draggable-resizable.css'

import { defineComponent } from 'vue'

const baseStyle = {
  position: 'relative',
  backgroundColor: '#808080',
  background: 'linear-gradient(-90deg, rgba(0, 0, 0, .1) 1px, transparent 1px), linear-gradient(rgba(0, 0, 0, .1) 1px, transparent 1px)',
  backgroundSize: '20px 20px, 20px 20px',
  height: '100vh'
}

export default defineComponent({
  components: {
    VueDraggableResizable,
  },
  data () {
    return {
      grid: [20, 40],
    }
  },
  computed: {
    style () {
      return {
        ...baseStyle,
        backgroundSize: `${this.grid[0]}px ${this.grid[1]}px, ${this.grid[0]}px ${this.grid[1]}px`
      }
    }
  }
})
</script>

<template>
  <Story auto-props-disabled title="Grid prop">
    <div :style="style">
      <vue-draggable-resizable :grid="grid" :x="0" :y="0">
        <p>Grid {{ grid[0] }}x {{ grid[1] }} starting from the top-left corner</p>
      </vue-draggable-resizable>
    </div>

    <template #controls>
      <HstNumber v-model="grid[0]" :step="1" title="Grid x" />
      <HstNumber v-model="grid[1]" :step="1" title="Grid y" />
    </template>
  </Story>
</template>

<docs lang="md">
  ## Basic component with Grid

  A basic component, with `:grid=[20,20]` prop to set the dimensions of grid cells (height and width in pixels).
</docs>
