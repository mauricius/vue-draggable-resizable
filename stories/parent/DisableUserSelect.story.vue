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
      disableUserSelect: true
    }
  }
})
</script>

<template>
  <Story auto-props-disabled title="Disable User Select">
    <div style="position: relative; height: 300px; border: 1px solid blue; margin: 1em;">
      <vue-draggable-resizable :parent="true" :disableUserSelect="disableUserSelect">
        <p>You can {{ disableUserSelect ? 'not' : '' }} select text inside the component by putting <b>:disableUserSelect</b> prop equal to {{ disableUserSelect }}.</p>
      </vue-draggable-resizable>
    </div>

    <template #controls>
      <HstCheckbox v-model="disableUserSelect" title="Disable user select" />
    </template>
  </Story>
</template>

<docs lang="md">
  ## Component with text selection disabled

  Component that disables text selection of an element using the prop `:disable-user-select="true"` prop.
</docs>
