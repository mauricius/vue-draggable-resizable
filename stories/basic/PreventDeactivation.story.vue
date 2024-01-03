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
      preventDeactivation: true
    }
  },
})
</script>

<template>
  <Story auto-props-disabled title="Prevent Deactivation prop">
    <vue-draggable-resizable :prevent-deactivation="preventDeactivation">
      <p>Prevents the deactivation of the component by providing the <b>prevent-deactivation</b> prop.</p>
    </vue-draggable-resizable>

    <template #controls>
      <HstCheckbox v-model="preventDeactivation" title="Prevent Deactivation" />
    </template>
  </Story>
</template>

<docs lang="md">
  ## Prevent deactivation

  A basic component, with `:prevent-deactivation` prop to avoid untoggling active state when clicking outside.
</docs>
