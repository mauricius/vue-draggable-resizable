<template>
  <div id="app">
    <div style="height: 500px; width: 500px; margin: 20px; border: 1px solid red; position: relative;">
      <VueDraggableResizable :x="50" :y="50" :w="400" :h="400" :parent="true">
        <p>Component</p>
      </VueDraggableResizable>
    </div>
    <div style="height: 500px; width: 500px; margin: 20px; border: 1px solid red; position: relative;">
      <VueDraggableResizable :x="50" :y="50" :w="150" :h="50" :parent="true" :resizable="false" :dragHandle="'.dragHandle'">
        <p>Component</p>
        <span class="dragHandle">
          =
        </span>
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
  .dragHandle {
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px;
    font-size: 20px;
    background-color: lightgrey;
  }
</style>
