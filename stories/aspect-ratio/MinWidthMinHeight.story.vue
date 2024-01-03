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
      minWidth: 50,
      minHeight: 100
    }
  },
})
</script>

<template>
  <Story auto-props-disabled title="Min Width Min Height">
    <vue-draggable-resizable :lock-aspect-ratio="lockAspectRatio" :min-width="minWidth" :min-height="minHeight">
      <p>Keep aspect ratio and set <b>minWidth</b> to {{ minWidth }} and <b>minHeight</b> to {{ minHeight }}.</p>
    </vue-draggable-resizable>

    <template #controls>
      <HstCheckbox v-model="lockAspectRatio" title="Lock Aspect Ratio" />
      <HstNumber v-model="minWidth" :step="1" title="Min Width" />
      <HstNumber v-model="minHeight" :step="1" title="Min Height" />
    </template>
  </Story>
</template>

<docs lang="md">
  ## Component with Aspect Ratio and minHeight, minWidth

  A component, with `:lock-aspect-ratio` prop and `:min-height` set to `100` and `:min-width` set to `50`. Notice that locking the aspect ratio also forces the Min Width to be 100 (Factor: 1 / 1).
</docs>
