<script>
import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'
import '@/components/vue-draggable-resizable.css'

import { defineComponent } from 'vue'

const withGridInParentStyle = {
  position: 'relative',
  backgroundColor: '#808080',
  background: 'linear-gradient(-90deg, rgba(0, 0, 0, .1) 1px, transparent 1px), linear-gradient(rgba(0, 0, 0, .1) 1px, transparent 1px)',
  backgroundSize: '20px 20px, 20px 20px',
  height: '400px',
  width: '400px',
  border: '1px solid blue',
  margin: '20px',
  boxSizing: 'border-box'
}

export default defineComponent({
  components: {
    VueDraggableResizable,
  },
  data () {
    return {
      lockAspectRatio: true,
      parent: true,
      grid: [20, 20]
    }
  },
  computed: {
    style () {
      return {
        ...withGridInParentStyle
      }
    }
  }
})
</script>

<template>
  <Story auto-props-disabled title="Forced on Grid in parent">
    <div :style="style">
      <vue-draggable-resizable :lock-aspect-ratio="lockAspectRatio" :grid="grid" :parent="parent">
        <p>Keep aspect ratio, grid and parent costrained.</p>
      </vue-draggable-resizable>
    </div>

    <template #controls>
      <HstCheckbox v-model="lockAspectRatio" title="Lock Aspect Ratio" />
      <HstCheckbox v-model="parent" title="Costrain in parent" />
    </template>
  </Story>
</template>
