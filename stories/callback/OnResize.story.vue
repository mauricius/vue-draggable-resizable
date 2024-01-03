<script>
import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'
import '@/components/vue-draggable-resizable.css'

import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    VueDraggableResizable,
  },
  data() {
    return {
      handles: ['mr', 'br', 'bm'],
    }
  },
  methods: {
    onResize(handle, x, y, width, height) {
      if (width > 200 && height > 200) {
        return false
      }
    }
  }
})
</script>

<template>
  <Story auto-props-disabled>
    <vue-draggable-resizable :on-resize="onResize" :w="100" :h="100" :draggable="false" :handles="handles"></vue-draggable-resizable>
    <div style="width: 200px; height: 200px; background-color: red; position: absolute; top: 200px; left: 200px; text-align: center; line-height: 200px; font-size: 24px">
      Can't touch me
    </div>
  </Story>
</template>

<docs lang="md">
  ## onResize callback

  A component with `:onResize` prop that accepts a function that gets called on resizing. If the function returns `false`, the action is cancelled.
</docs>
