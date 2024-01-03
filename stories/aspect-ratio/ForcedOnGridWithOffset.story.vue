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
      minHeight: 30,
      minWidth: 30,
      lockAspectRatio: true,
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
  <Story auto-props-disabled title="Forced on Grid with Offset">
    <div :style="style">
      <vue-draggable-resizable :lock-aspect-ratio="lockAspectRatio" :x="x" :y="y" :min-height="minHeight" :min-width="minWidth" :grid="grid">
        <p>Aspect ratio in Grid 20x40 starting with a 10x20 offset</p>
      </vue-draggable-resizable>
    </div>

    <template #controls>
      <HstCheckbox v-model="lockAspectRatio" title="Lock Aspect Ratio" />
    </template>
  </Story>
</template>
