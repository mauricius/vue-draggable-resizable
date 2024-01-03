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
      classNameDragging: 'my-dragging-class'
    }
  },
})
</script>

<template>
  <Story auto-props-disabled title="Dragging Class Name prop">
    <vue-draggable-resizable :class-name-dragging="classNameDragging" class-name="my-class">
      <p>You can provide a default class name for the component when it's dragging using the <b>class-name-dragging</b> prop.</p>
    </vue-draggable-resizable>

    <template #controls>
      <HstText v-model="classNameDragging" title="Dragging Class Name" />
    </template>
  </Story>
</template>

<docs lang="md">
  ## Component with custom class name on dragging

  Component with a custom class name on dragging, provided with the prop `:class-name-dragging`.

  ```css
  .my-class {
    background-color: green;
    border: 1px solid red;
    -webkit-transition: background-color 200ms linear;
    -ms-transition: background-color 200ms linear;
    transition: background-color 200ms linear;
  }

  .my-dragging-class {
      background-color: red;
      border: 1px solid black;
  }
  ```
</docs>
