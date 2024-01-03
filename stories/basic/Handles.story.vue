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
      handles: ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'],
      w: 250,
      h: 250,
      available: ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml']
    }
  },
})
</script>

<template>
  <Story auto-props-disabled>
    <vue-draggable-resizable :w="w" :h="h" :handles="handles">
      <p>Enable/disable handles.</p>
      <ul>
        <li v-for="handle, i in available" :key="i">{{ handle }} - {{ handles[i] ? '&check;' : '&cross;' }}</li>
      </ul>
    </vue-draggable-resizable>

    <template #controls>
      <HstCheckboxList v-model="handles" title="Handles" :options="available.map(handle => ({ 'label': handle.toUpperCase(), 'value': handle }))" />
    </template>
  </Story>
</template>

<docs lang="md">
  ## Basic component with handles prop

  You can choose what handles to provide to the component using the `handles` prop, which accepts an array of handles. For example, if you want to costrain resizing only on horizontal axis you can provide only left and right handles `:handles="['ml','mr']"`.
</docs>
