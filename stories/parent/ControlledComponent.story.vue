<script>
import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'
import '@/components/vue-draggable-resizable.css'

import { defineComponent } from 'vue'

const baseStyle = {
  position: 'relative',
    backgroundColor: '#808080',
    background: 'linear-gradient(-90deg, rgba(0, 0, 0, .1) 1px, transparent 1px), linear-gradient(rgba(0, 0, 0, .1) 1px, transparent 1px)',
    backgroundSize: '20px 20px, 20px 20px',
    backgroundPosition: '10px 10px',
    height: '400px',
    width: '400px',
    border: '1px solid blue',
    boxSizing: 'content-box'
}

export default defineComponent({
  components: {
    VueDraggableResizable,
  },
  data () {
    return {
      x: 10,
      y: 10,
      w: 100,
      h: 100
    }
  },
  computed: {
    style () {
      return {
        ...baseStyle
      }
    }
  }
})
</script>

<template>
  <Story auto-props-disabled title="Controlled Component">
    <div :style="style">
      <vue-draggable-resizable :parent="true" :grid=[20,20] :x="x" :y="y" :h="h" :w="w">
        <p>You cannot move me or resize me outside my parent.</p>
      </vue-draggable-resizable>
    </div>

    <template #controls>
      <HstNumber v-model="x" :step="1" title="x" />
      <HstNumber v-model="y" :step="1" title="y" />
      <HstNumber v-model="w" :step="1" title="w" />
      <HstNumber v-model="h" :step="1" title="h" />
    </template>
  </Story>
</template>

<docs lang="md">
  ## Parent controlled Component with Grid

  A basic parent controlled component, with `:x`, `:y`, `:w` and `:h` props to control the position and the size of the component. Notice that using also the `:grid` prop, the component will react only with a valid multiple of grid values.
</docs>
