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
      x: 0,
      y: 0,
      w: 100,
      h: 100
    }
  }
})
</script>

<template>
  <Story auto-props-disabled title="Controlled Component">
    <vue-draggable-resizable :x="x" :y="y" :w="w" :h="h">
      <p>Basic controlled component.</p>
    </vue-draggable-resizable>

    <template #controls>
      <HstNumber v-model="x" :step="1" title="x" />
      <HstNumber v-model="y" :step="1" title="y" />
      <HstNumber v-model="w" :step="1" title="w" />
      <HstNumber v-model="h" :step="1" title="h" />
    </template>
  </Story>
</template>

<docs lang="md">
  ## Basic controlled component

  A basic controlled component, with `x`, `y`, `w` and `h` props to control the position and the size of the component. You should also provide callbacks to sync the state with the parent.
</docs>
