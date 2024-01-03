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
      minWidth: 100,
      minHeight: 100
    }
  }
})
</script>

<template>
  <Story auto-props-disabled title="Min Width Min Height">
    <vue-draggable-resizable :min-width="minWidth" :min-height="minHeight">
      <p>Basic component with programmable <b>minWidth</b> and <b>minHeight</b> props.</p>
    </vue-draggable-resizable>
    <template #controls>
      <HstNumber v-model="minWidth" :step="1" title="Min Width" />
      <HstNumber v-model="minHeight" :step="1" title="Min Height" />
    </template>
  </Story>
</template>

<docs lang="md">
  ## Basic component with Min Height and Min Width

  A basic component, with minimum height and minimum width provided respectively by `:min-width` and `:min-height` props.
</docs>
