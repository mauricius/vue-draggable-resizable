<script setup>
import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'
import '@/components/vue-draggable-resizable.css'
import '../styles.css'
</script>

<template>
  <Story auto-props-disabled title="Cancel Handle">
    <vue-draggable-resizable :drag-cancel="'.drag-cancel'">
      <div class="drag-cancel">Cannot Drag Here</div>
    </vue-draggable-resizable>
  </Story>
</template>

<docs lang="md">
  ## Basic component with Drag Cancel

  A basic component, that cannot be dragged through a handle, specified by the prop `:drag-cancel` and a valid CSS selector.
</docs>
