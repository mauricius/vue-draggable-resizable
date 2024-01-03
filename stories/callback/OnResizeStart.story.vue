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
      prevent: false,
      clicked: false
    }
  },
  methods: {
    onResizeStart(e) {
      if (this.prevent) {
        return false
      }

      this.clicked = true

      setTimeout(() => {
        this.clicked = false
      }, 1000)
    }
  }
})
</script>

<template>
  <Story auto-props-disabled>
    <vue-draggable-resizable :on-resize-start="onResizeStart">
      <p v-if="clicked">Start resizing!</p>
      <p v-if="prevent">The component is locked!</p>
    </vue-draggable-resizable>

    <template #controls>
      <HstCheckbox v-model="prevent" title="Prevent resizing" />
    </template>
  </Story>
</template>

<docs lang="md">
  ## onResizeStart callback

  A component, with `:onResizeStart` prop that accepts a function that gets called when dragging starts (element is clicked or touched). If the function returns `false`, the resizing action is cancelled. You can use this function to prevent bubbling of events.

  ```js
  function onResizeStartCallback(handle, ev){
    ...
    // return false; — for cancel
  }
  ```
</docs>
