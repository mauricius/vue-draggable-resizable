<template>
  <div id="app">
    <div style="height: 500px; width: 500px; margin: 20px; border: 1px solid red; position: relative;">
      <vue-draggable-resizable class="comp2" :x="50" :y="50" :z="zIndex1" :parent="true">
        <p>Component1</p>
      </vue-draggable-resizable>
      <vue-draggable-resizable class="comp1" :x="30" :y="30" :z="zIndex2" :parent="true">
        <p>Component2</p>
      </vue-draggable-resizable>
    </div>
    z1 <input v-model.number.lazy="zIndex1">
    z2 <input v-model.number.lazy="zIndex2">
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
      zIndex1: 'auto',
      zIndex2: 'auto'
    }
  }

}
</script>

<style>
  .active {
    border: 1px dashed black;
  }

  .comp1 {
    background-color: blue;
  }

  .comp2 {
    background-color: red;
  }
</style>
