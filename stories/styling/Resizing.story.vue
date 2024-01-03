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
      classNameResizing: 'my-resizing-class'
    }
  },
})
</script>

<template>
  <Story auto-props-disabled title="Resizing Class Name prop">
    <vue-draggable-resizable :class-name-resizing="classNameResizing" class-name="my-class">
      <p>You can provide a default class name for the component when it's resizing using the <b>class-name-resizing</b> prop.</p>
    </vue-draggable-resizable>

    <template #controls>
      <HstText v-model="classNameResizing" title="Resizing Class Name" />
    </template>
  </Story>
</template>

<docs lang="md">
  ## Component with custom class name on resizing

  Component with a custom class name on resizing, provided with the prop `:class-name-resizing`.

  ```css
  .my-class {
    background-color: green;
    border: 1px solid red;
    -webkit-transition: background-color 200ms linear;
    -ms-transition: background-color 200ms linear;
    transition: background-color 200ms linear;
  }

  .my-resizing-class {
      background-color: blue;
      border: 1px solid black;
      color: white;
  }
  ```
</docs>
