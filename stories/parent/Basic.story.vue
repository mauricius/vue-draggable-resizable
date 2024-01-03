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
      parent: true,
    }
  }
})
</script>

<template>
  <Story auto-props-disabled title="Basic use case">
    <div style="position: relative; height: 400px; border: 1px solid blue; margin: 1em;">
        <vue-draggable-resizable :parent="parent">
          <p>You cannot move me or resize me outside my parent element.</p>
        </vue-draggable-resizable>
      </div>

    <template #controls>
      <HstCheckbox v-model="parent" title="Costrained in parent" />
    </template>
  </Story>
</template>

<docs lang="md">
  ## Component costraind in parent

  Component that cannot be dragged or resized outside its parent element, defined with the prop `:parent="true"`.
</docs>
