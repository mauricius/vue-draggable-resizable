<script setup>
import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'
import '@/components/vue-draggable-resizable.css'
</script>

<template>
  <Story auto-props-disabled title="Basic component">
    <Variant>
      <vue-draggable-resizable>
        <p>You can drag me around and resize me as you wish.</p>
      </vue-draggable-resizable>
    </Variant>
  </Story>
</template>

<docs lang="md">
  ## Basic component

  The most basic component, without any props, free to move even outside the parent element.
</docs>
