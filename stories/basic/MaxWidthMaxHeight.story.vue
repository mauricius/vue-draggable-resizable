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
      maxWidth: 300,
      maxHeight: 300
    }
  }
})
</script>

<template>
  <Story auto-props-disabled title="Max Width Max Height">
    <vue-draggable-resizable :max-width="maxWidth" :max-height="maxHeight">
      <p>Basic component with programmable <b>maxWidth</b> and <b>maxHeight</b> props.</p>
    </vue-draggable-resizable>

    <template #controls>
      <HstNumber v-model="maxWidth" :step="1" title="Max Width" />
      <HstNumber v-model="maxHeight" :step="1" title="Max Height" />
    </template>
  </Story>
</template>

<docs lang="md">
  ## Basic component with Max Height and Max Width

  A basic component, with Max Height and Max Width provided respectively by `:max-height` and `:max-width` props
</docs>
