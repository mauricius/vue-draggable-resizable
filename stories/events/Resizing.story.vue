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
      resizing: false,
      x: 0,
      y: 0,
      width: 200,
      height: 200
    }
  },
  methods: {
    onResize: function (...$event) {
      this.resizing = true;
      this.x = $event[0];
      this.y = $event[1];
      this.width = $event[2];
      this.height = $event[3];

      logEvent('resizing', $event)
    },
    onResizeStop: function (...$event) {
      this.resizing = false;

      logEvent('resizeStop', $event)
    }
  }
})
</script>

<template>
  <Story auto-props-disabled>
    <vue-draggable-resizable :w="width" :h="height" :x="x" :y="y" @resizing="onResize" @resize-stop="onResizeStop">
      <p>{{ resizing ? 'You are resizing me' : 'This is my favourite shape' }}<br>
      X: {{ x }} / Y: {{ y }} - Width: {{ width }} / Height: {{ height }}</p>
    </vue-draggable-resizable>
  </Story>
</template>

<docs lang="md">
  ## Resizing and resizestop events

  The `resizing(x, y, width, height)` event is emitted when the component is resized. The `resizestop(x, y, width, height)` event is emmitted when the resizing stops.
</docs>
