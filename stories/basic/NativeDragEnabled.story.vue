<script setup>
import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'
import '@/components/vue-draggable-resizable.css'
</script>

<template>
  <Story auto-props-disabled title="Native Drag Enabled">
    <vue-draggable-resizable :enable-native-drag="false" :x="0" :y="0" :w="200" :h="200">
      <p>Native drag disabled. Try to drag the component from the ball.</p>
      <img src="https://js.cx/clipart/ball.svg" />
    </vue-draggable-resizable>
    <vue-draggable-resizable :enable-native-drag="true" :x="0" :y="200" :w="200" :h="200">
      <p>Native drag enabled. Try to drag the component from the ball.</p>
      <img src="https://js.cx/clipart/ball.svg" />
    </vue-draggable-resizable>
  </Story>
</template>

<docs lang="md">
  ## Component with native drag enabled

  A basic component, with `:enable-native-drag` prop set to `true`, in order to allow native browser's drag behavior. You can see the difference by dragging each component using the ball. Default value is `false`.
</docs>
