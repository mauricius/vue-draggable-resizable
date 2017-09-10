<template>
  <div id="app">
    <div style="height: 500px; width: 500px; margin: 20px; border: 1px solid red; position: relative;">
      <vue-draggable-resizable :x="x" :y="y" :w="w" :h="h" :parent="true" @resizing="onResize" @dragging="onDrag">
        <p>Component</p>
      </VueDraggableResizable>
    </div>
    <div>
      X <input type="number" v-model.number.lazy="x"> / Y <input type="number" v-model.number="y"> <br>
      Width <input type="number" v-model.number.lazy="w"> / Height <input type="number" v-model.number="h">
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
  data: function () {
    return {
      x: 50,
      y: 50,
      w: 200,
      h: 200
    }
  },
  methods: {
    onResize: function (left, top, width, height) {
      this.x = left
      this.y = top
      this.w = width
      this.h = height
    },
    onDrag: function (left, top) {
      this.x = left
      this.y = top
    }
  }
}
</script>

<style>
  .vdr {
    border: 1px dashed black;
  }
</style>
