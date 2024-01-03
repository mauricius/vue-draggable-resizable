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
      lockAspectRatio: true
    }
  },
})
</script>

<template>
  <Story auto-props-disabled title="Lock Aspect Ratio">
    <vue-draggable-resizable :lock-aspect-ratio="lockAspectRatio">
      <p>Keep aspect ratio using <b>:lock-aspect-ratio</b> prop.</p>
    </vue-draggable-resizable>

    <template #controls>
      <HstCheckbox v-model="lockAspectRatio" title="Lock Aspect Ratio" />
    </template>
  </Story>
</template>

<docs lang="md">
  ## Component with Aspect Ratio

  A component, with `:lock-aspect-ratio` prop to keep the aspect ratio of the component during resize.
</docs>
