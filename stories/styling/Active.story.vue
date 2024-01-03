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
      classNameActive: 'my-active-class'
    }
  },
})
</script>

<template>
  <Story auto-props-disabled title="Active Class Name prop">
    <vue-draggable-resizable :class-name-active="classNameActive" class-name="my-class">
      <p>You can provide a default class name for the component when it's active using the <b>class-name-active</b> prop.</p>
    </vue-draggable-resizable>

    <template #controls>
      <HstText v-model="classNameActive" title="Active Class Name" />
    </template>
  </Story>
</template>

<docs lang="md">
  ## Component with custom class name on active state

  Component with a custom class name on active state, provided with the prop `:class-name-active`.

  ```css
  .my-class {
    background-color: green;
    border: 1px solid red;
    -webkit-transition: background-color 200ms linear;
    -ms-transition: background-color 200ms linear;
    transition: background-color 200ms linear;
  }

  .my-active-class {
      border: 1px solid black;
      -webkit-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
      -moz-box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
      box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
  }
  ```
</docs>
