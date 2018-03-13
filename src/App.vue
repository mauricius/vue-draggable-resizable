<template>
  <div id="app">
    <div style="height: 500px; width: 500px; margin: 20px; border: 1px solid red; position: relative;">
      <VueDraggableResizable :x="50" :y="50" :w="200" :h="200" :parent="true">
        <p>Component</p>
      </VueDraggableResizable>

      <VueDraggableResizable :x="250" :y="250" :w="400" :h="400" :parent="true">
        <p>Component2</p>
      </VueDraggableResizable>
    </div>
  </div>
</template>

<script>
import VueDraggableResizable from './components/vue-draggable-resizable'

export default {
  name: 'app',
  components: {
    VueDraggableResizable
  }
}
</script>

<style>
  .active {
    border: 1px dashed black;
  }
</style>
