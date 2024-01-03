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
      parent: true
    }
  },
})
</script>

<template>
  <Story auto-props-disabled title="Costrained in Parent">
    <div style="position: relative; height: 400px; border: 1px solid blue; margin: 1em;">
      <vue-draggable-resizable :lock-aspect-ratio="lockAspectRatio" :parent="parent">
        <p>Combine aspect ratio and costrain in parent.</p>
      </vue-draggable-resizable>
    </div>

    <template #controls>
      <HstCheckbox v-model="lockAspectRatio" title="Lock Aspect Ratio" />
      <HstCheckbox v-model="parent" title="Costrained in Parent" />
    </template>
  </Story>
</template>

<docs lang="md">
  ## Component with Aspect Ratio costrained in parent

  A component costrained in parent, with `:lock-aspect-ratio` prop to keep the aspect ratio of the component during resize.
</docs>
