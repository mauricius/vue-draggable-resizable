<script>
import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'
import '@/components/vue-draggable-resizable.css'

import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    VueDraggableResizable,
  },
  data () {
    return {
      lockAspectRatio: true,
      maxWidth: 300,
      maxHeight: 250
    }
  },
})
</script>

<template>
  <Story auto-props-disabled title="Max Width Max Height">
    <vue-draggable-resizable :lock-aspect-ratio="lockAspectRatio" :max-width="maxWidth" :max-height="maxHeight">
      <p>Keep aspect ratio and set <b>maxWidth</b> to {{ maxWidth }} and <b>maxHeight</b> to {{ maxHeight }}.</p>
    </vue-draggable-resizable>

    <template #controls>
      <HstCheckbox v-model="lockAspectRatio" title="Lock Aspect Ratio" />
      <HstNumber v-model="maxWidth" :step="1" title="Max Width" />
      <HstNumber v-model="maxHeight" :step="1" title="Max Height" />
    </template>
  </Story>
</template>

<docs lang="md">
  ## Component with Aspect Ratio and maxWidth, maxHeight

  A component, with `:lock-aspect-ratio` prop and `:max-width` set to `300` and `:max-height` set to `250`. Notice that locking the aspect ratio also forces the max width to be 250.
</docs>
