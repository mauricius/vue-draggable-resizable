<script>
import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'
import '@/components/vue-draggable-resizable.css'

import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    VueDraggableResizable,
  },
  methods: {
    onDrag(x, y) {
      if ((x > 100 && x < 400) && (y > 100 && y < 400)) {
        return false
      }
    }
  }
})
</script>

<template>
  <Story auto-props-disabled>
    <vue-draggable-resizable :on-drag="onDrag" :w="100" :h="100" :resizable="false"></vue-draggable-resizable>
    <div style="width: 200px; height: 200px; background-color: red; position: absolute; top: 200px; left: 200px; text-align: center; line-height: 200px; font-size: 24px">
      Can't touch me
    </div>
  </Story>
</template>

<docs lang="md">
  ## onDrag callback

  A component with `:onDrag` prop that accepts a function that gets called on dragging. If the function returns `false`, the drag action is cancelled.
</docs>
