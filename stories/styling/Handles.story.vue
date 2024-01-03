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
      classNameHandle: 'my-handle-class'
    }
  },
})
</script>

<template>
  <Story auto-props-disabled title="Handle Class Name prop">
    <vue-draggable-resizable :class-name-handle="classNameHandle">
      <p>You can provide a default class name for the handle using the <b>class-name-handle</b> prop.</p>
    </vue-draggable-resizable>

    <template #controls>
      <HstText v-model="classNameHandle" title="Handle Class Name" />
    </template>
  </Story>
</template>

<docs lang="md">
  ## Component with custom class name handles

  Component with a custom class for handle, provided with the prop `:class-name-handle`. In this way you can style each handle separately.

  **Remember to set `position: absolute` for the handle class**
  ```css
  .my-handle-class {
    position: absolute.
    border: 1px solid black;
    border-radius: 50%;
    height: 14px;
    width: 14px;
    box-model: border-box;
    -webkit-transition: all 300ms linear;
    -ms-transition: all 300ms linear;
    transition: all 300ms linear;
  }

  .my-handle-class-tl {
    top: -14px;
    left: -14px;
    cursor: nw-resize;
  }

  .my-handle-class-tm {
    top: -14px;
    left: 50%;
    margin-left: -7px;
    cursor: n-resize;
  }

  .my-handle-class-tr {
    top: -14px;
    right: -14px;
    cursor: ne-resize;
  }

  .my-handle-class-ml {
    top: 50%;
    margin-top: -7px;
    left: -14px;
    cursor: w-resize;
  }

  .my-handle-class-mr {
    top: 50%;
    margin-top: -7px;
    right: -14px;
    cursor: e-resize;
  }

  .my-handle-class-bl {
    bottom: -14px;
    left: -14px;
    cursor: sw-resize;
  }

  .my-handle-class-bm {
    bottom: -14px;
    left: 50%;
    margin-left: -7px;
    cursor: s-resize;
  }

  .my-handle-class-br {
    bottom: -14px;
    right: -14px;
    cursor: se-resize;
  }

  .my-handle-class-tl:hover,
  .my-handle-class-tr:hover,
  .my-handle-class-bl:hover,
  .my-handle-class-br:hover {
      background-color: red;
      transform: scale(1.4);
  }
  ```
</docs>
