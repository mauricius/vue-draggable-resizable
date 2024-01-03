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
    <div style="position: relative; height: 400px; border: 1px solid blue; margin: 1em;">
      <vue-draggable-resizable :parent="true" :max-width="maxWidth" :max-height="maxHeight">
        <p>Component costrained in parent with <b>maxWidth</b> equal to {{ maxWidth }} and <b>maxHeight</b> equal to {{ maxHeight }}.</p>
      </vue-draggable-resizable>
    </div>

    <template #controls>
      <HstNumber v-model="maxWidth" :step="1" title="Max Width" />
      <HstNumber v-model="maxHeight" :step="1" title="Max Height" />
    </template>
  </Story>
</template>

<docs lang="md">
  ## Component costrained in parent with maxWidth and maxHeight

  Component that cannot be dragged or resized outside its parent element, with `:max-width` and `:max-height` props to limit its size.
</docs>
