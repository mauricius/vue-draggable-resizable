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
      axis: 'x'
    }
  },
})
</script>

<template>
  <Story auto-props-disabled title="Axis prop">
    <vue-draggable-resizable :axis="axis">
      <p>Draggable on {{ axis }} axis.</p>
    </vue-draggable-resizable>

    <template #controls>
      <HstRadio title="Axis" v-model="axis" :options="[
        {
          label: 'X',
          value: 'x',
        },
        {
          label: 'Y',
          value: 'y',
        },
        {
          label: 'Both',
          value: 'both',
        },
      ]" />
    </template>
  </Story>
</template>

<docs lang="md">
  ## Basic component with axis prop

  A basic component, with `:axis` prop to control on which axis the component is draggable. Suitable values are `x`, `y` or `both`.
</docs>
