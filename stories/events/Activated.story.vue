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
      active: false
    }
  },
  methods: {
    onActivated ($event) {
      this.active = true

      logEvent('activated', $event)
    },
    onDeactivated ($event) {
      this.active = false

      logEvent('deactivated', $event)
    }
  }
})
</script>

<template>
  <Story auto-props-disabled>
    <vue-draggable-resizable :w="200" :h="200" @activated="onActivated" @deactivated="onDeactivated">
      <p v-if="active">The component has been activated.</p>
    </vue-draggable-resizable>
  </Story>
</template>

<docs lang="md">
  ## Activated and deactivated events

  The `activated` event is emitted when the component gets activated. The `deactivated` event is emitted when the component gets deactivated.
</docs>
