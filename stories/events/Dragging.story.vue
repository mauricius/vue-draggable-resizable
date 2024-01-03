<script>
import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'
import '@/components/vue-draggable-resizable.css'

import { defineComponent } from 'vue'
import { logEvent } from 'histoire/client'

export default defineComponent({
  components: {
    VueDraggableResizable,
  },
  data () {
    return {
      dragging: false,
      x: 0,
      y: 0
    }
  },
  methods: {
    onDrag: function (...$event) {
      this.dragging = true
      this.x = $event[0]
      this.y = $event[1]

      logEvent('dragging', $event)
    },
    onDragStop: function (...$event) {
      this.dragging = false

      logEvent('dragStop', $event)
    }
  }
})
</script>

<template>
  <Story auto-props-disabled>
    <vue-draggable-resizable :w="200" :h="200" @dragging="onDrag" @drag-stop="onDragStop">
      <p>{{ dragging ? 'You are dragging me' : 'Standing still' }}<br>X: {{ x }} / Y: {{ y }}</p>
    </vue-draggable-resizable>
  </Story>
</template>

<docs lang="md">
  ## Dragging and dragstop events

  The `dragging(x, y)` event is emitted when the component is dragged. The `dragstop(x, y)` event is emmitted when the dragging stops.
</docs>
