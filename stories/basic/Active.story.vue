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
      active: false
    }
  },
})
</script>

<template>
  <Story auto-props-disabled title="Active prop">
    <vue-draggable-resizable :active="active">
      <p>Controlling the active state from outside the component by providing the <b>active</b> prop.</p>
    </vue-draggable-resizable>

    <template #controls>
      <HstCheckbox v-model="active" title="Active" />
    </template>
  </Story>
</template>

<docs lang="md">
  ## Basic component with active control

  A basic component, with `active` prop to control the active state from outside the component.
</docs>
