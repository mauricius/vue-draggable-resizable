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
      scale: 1
    }
  }
})
</script>

<template>
  <Story auto-props-disabled title="Scale prop" v-bind:style="{ transform: 'scale(' + scale + ')' }">
    <vue-draggable-resizable :scale="scale">
      <p>Change the "scale" property to support CSS scale transform. Current value is {{ scale }}</p>
    </vue-draggable-resizable>
    <vue-draggable-resizable :x="250">
      <p>Component with default scale prop set to 1</p>
    </vue-draggable-resizable>

    <template #controls>
      <HstNumber v-model="scale" :step="1" title="Scale" />
    </template>
  </Story>
</template>

<docs lang="md">
  ## Basic component with scale prop

  A basic component, with `:scale` prop to control the scale property when the CSS 3 scale transformation is applied to one of the parent elements. If not provided the default value is `1`.
</docs>
