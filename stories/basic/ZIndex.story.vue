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
      z: 0
    }
  }
})
</script>

<template>
  <Story auto-props-disabled title="Z Index prop">
    <vue-draggable-resizable :z="z">
      <p>Controlling the z-index from outside the component by providing the <b>:z</b> prop.</p>
    </vue-draggable-resizable>
    <div style="width: 200px; height: 200px; background-color: red; position: absolute; top: 100px; left: 100px; z-index: 1; text-align: center; font-size: 24px">
      1
    </div>
    <div style="width: 300px; height: 300px; background-color: green; position: absolute; top: 200px; left: 200px; z-index: 9; text-align: center; font-size: 24px">
      9
    </div>

    <template #controls>
      <HstNumber v-model="z" :step="1" title="Z Index" />
    </template>
  </Story>
</template>

<docs lang="md">
  ## Basic component with "auto" width and height

  A basic component with initial values for `w` and `h` props set to `auto`. As soon as the component is resized their values fall back to numbers.
</docs>
