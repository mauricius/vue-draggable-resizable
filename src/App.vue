<template>
  <div id="app">
    <div style="height: 500px; width: 500px; border: 1px solid red; position: relative;transform:scale(0.8, 0.65)">
      <vue-draggable-resizable :w="300" :h="300" :parent="true" :debug="false" :min-width="200" :min-height="200" :scale="[0.8, 0.65]">
        <p>vue-draggable-resizable</p>
      </vue-draggable-resizable>
    </div>
  </div>
</template>

<script>
import VueDraggableResizable from './components/vue-draggable-resizable'
import './components/vue-draggable-resizable.css'

export default {
  name: 'app',
  components: {
    VueDraggableResizable
  }
}
</script>

<style>
  .vdr {
    border: 1px dashed black;
  }
</style>
