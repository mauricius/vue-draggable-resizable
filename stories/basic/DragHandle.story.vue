<script setup>
import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'
import '@/components/vue-draggable-resizable.css'
import '../styles.css'
</script>

<template>
  <Story auto-props-disabled title="Drag Handle">
    <vue-draggable-resizable :drag-handle="'.drag-handle'">
      <div class="drag-handle">Drag Only Here</div>
    </vue-draggable-resizable>
  </Story>
</template>

<docs lang="md">
  ## Basic component with Drag Handle

  A basic component, that cannot be dragged through a handle, specified by the prop `:drag-handle` and a valid CSS selector.
</docs>
