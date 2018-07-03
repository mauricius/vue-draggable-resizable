<template>
  <div id="app">
    <div style="margin: 0 20px">
      Respect aspect ration: <input type="checkbox" @change="respectAspectRatio = !respectAspectRatio">
    </div>
    <div style="height: 500px; width: 500px; margin: 20px; border: 1px solid red; position: relative;">
      <VueDraggableResizable :x="50" :y="500 - 200" :w="400" :h="200" axis="xb" :parent="true" :aspect="respectAspectRatio">
        <p>Component</p>
      </VueDraggableResizable>
    </div>
    <div style="height: 500px; width: 500px; margin: 20px; border: 1px solid red; position: relative;">
      <h2>Grid 30x30</h2>
      <VueDraggableResizable :x="50" :y="50" :w="400" :h="400" :grid="[30, 30]" :parent="true" :aspect="respectAspectRatio">
      <p>Component</p>
      </VueDraggableResizable>
    </div>
    <div style="height: 500px; width: 500px; margin: 20px; border: 1px solid red; position: relative;">
      <h2>Custom handler</h2>
      <VueDraggableResizable :x="50" :y="50" :w="150" :h="50" :parent="true" :resizable="false" :dragHandle="'.dragHandle'" :aspect="respectAspectRatio">
        <p>Component</p>
        <span class="dragHandle">
          =
        </span>
      </VueDraggableResizable>
    </div>
    <div style="height: 500px; width: 500px; margin: 20px; border: 1px solid red; position: relative;">
      <h2>Grid 30x30 and handler</h2>
      <VueDraggableResizable :x="50" :y="50" :w="150" :h="50" :parent="true" :grid="[30, 30]" :resizable="false" :dragHandle="'.dragHandle'" :aspect="respectAspectRatio">
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
  data () {
    return {
      respectAspectRatio: false
    }
  },
  components: {
    VueDraggableResizable
  }
}
</script>

<style>
  .active {
    border: 1px dashed black;
  }
  h2 {
    opacity: 0.3;
    padding: 0 0 0 20px;
    z-index: -1;
  }
  .dragHandle {
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px;
    font-size: 20px;
    background-color: lightgrey;
  }
  .vdr {
    background: white;
  }
</style>
