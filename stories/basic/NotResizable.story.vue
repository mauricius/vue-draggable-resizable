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
      resizable: false
    }
  },
})
</script>

<template>
  <Story auto-props-disabled title="Not Resizable">
    <vue-draggable-resizable :resizable="resizable">
      <p>Basic component that is {{ resizable ? 'also' : 'not' }} resizable.</p>
    </vue-draggable-resizable>

    <template #controls>
      <HstCheckbox v-model="resizable" title="Resizable" />
    </template>
  </Story>
</template>

<docs lang="md">
  ## Component not resizable

  A basic component, with `:resizable` prop set to `false`, so it's not resizable.
</docs>
