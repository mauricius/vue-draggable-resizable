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
      width: 'auto',
      height: 'auto'
    }
  },
  methods: {
    onResize(_left, _top, width, height) {
      this.width = width
      this.height = height
    }
  }
})
</script>

<template>
  <Story auto-props-disabled title="Size Auto">
    <vue-draggable-resizable :w="width" :h="height" v-on:resizing="onResize">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate aperiam explicabo animi expedita unde perspiciatis quae, consequatur consequuntur libero assumenda, accusantium repellat illo asperiores molestiae ea quasi distinctio, aspernatur saepe!</p>
    </vue-draggable-resizable>
    <div id="toolbar">
      Size: {{ width }} x {{ height }}
    </div>
  </Story>
</template>

<docs lang="md">
  ## Basic component with "auto" width and height

  A basic component with initial values for `w` and `h` props set to `auto`. As soon as the component is resized their values fall back to numbers.
</docs>
