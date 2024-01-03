<script>
import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'
import '@/components/vue-draggable-resizable.css'

import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    VueDraggableResizable,
  },
  data () {
    return {}
  },
  methods: {
    onSubmit(e) {
      const data = new FormData(e.target);
      const entries = [...data.entries()];

      alert(`You just submitted the form with "${entries[0][1]}"!`)
    }
  }
})
</script>

<template>
  <Story auto-props-disabled title="Basic component with form">
    <Variant>
      <vue-draggable-resizable>
        <p>Basic component with form inside.</p>
        <form @submit.stop.prevent="onSubmit">
          <input type="text" name="input" />
          <button type="submit">Submit</button>
        </form>
      </vue-draggable-resizable>
    </Variant>
  </Story>
</template>

<docs lang="md">
  ## Basic component with form

  A basic component, with a form inside. The input should be focusable and the button should be clickable.
</docs>
