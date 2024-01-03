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
      draggable: false
    }
  },
})
</script>

<template>
  <Story auto-props-disabled title="Not Draggable">
    <vue-draggable-resizable :draggable="draggable">
      <p>Basic component that is {{ draggable ? 'also' : 'not' }} draggable.</p>
    </vue-draggable-resizable>

    <template #controls>
      <HstCheckbox v-model="draggable" title="Draggable" />
    </template>
  </Story>
</template>

<docs lang="md">
  ## Component not draggable

  A basic component, with `:draggable` prop set to `false`, so it's not draggable.
</docs>
