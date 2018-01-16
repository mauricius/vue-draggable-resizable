<template>
  <div id="app">
    <div style="height: 500px; width: 500px; margin: 20px; border: 1px solid red; position: relative;">
      <vue-draggable-resizable :x="50" :y="50" :w="400" :h="400" :parent="true" :draggable="isDrag" @mouseup="isDrag = false">
        <p>Component</p>
        <span class="drag-btn" @mousedown="isDrag = true" @mouseup="isDrag = false"></span>
      </vue-draggable-resizable>
    </div>
  </div>
</template>

<script>
import VueDraggableResizable from './components/vue-draggable-resizable'

export default {
  name: 'app',
  components: {
    'vue-draggable-resizable': VueDraggableResizable
  },
  data () {
    return {
      isDrag: false
    }
  }
}
</script>

<style>
  .active {
    border: 1px dashed black;
  }
  .drag-btn::after {
    content: 'Subelement driven drag';
    background: #ccc;
  }
</style>
