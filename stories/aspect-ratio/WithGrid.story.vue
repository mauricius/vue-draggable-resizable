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
      lockAspectRatio: true,
      w: 400,
      h: 200,
      grid: [20, 20]
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
  <Story auto-props-disabled title="Forced on Grid">
    <div :style="style">
      <vue-draggable-resizable :lock-aspect-ratio="lockAspectRatio" :w="w" :h="h" :grid="grid">
        <p>Keep aspect ratio in component costrained on grid {{ grid }}.</p>
      </vue-draggable-resizable>
    </div>

    <template #controls>
      <HstCheckbox v-model="lockAspectRatio" title="Lock Aspect Ratio" />
    </template>
  </Story>
</template>

<docs lang="md">
  ## Component with Aspect Ratio costrained on 20x20 Grid

  Having a component costrained on a Grid doesn't play so well when using the `:lock-aspect-ratio` prop. You can notice that you have different results by dragging, for example, the right handle or the bottom handle.
</docs>
