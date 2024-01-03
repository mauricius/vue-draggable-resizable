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
      className: 'my-class'
    }
  },
})
</script>

<template>
  <Story auto-props-disabled title="Class Name prop">
    <vue-draggable-resizable :class-name="className">
      <p>You can provide a default class name for the component using the <b>class-name</b> prop.</p>
    </vue-draggable-resizable>

    <template #controls>
      <HstText v-model="className" title="Class Name" />
    </template>
  </Story>
</template>

<docs lang="md">
  ## Component with custom class name

  Component with a custom class name, provided with the prop `:class-name`.

  ```css
  .my-class {
    background-color: green;
    border: 1px solid red;
  }
  ```
</docs>
