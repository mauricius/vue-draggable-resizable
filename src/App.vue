<template>
  <div id="app">
    <div class="parents">
      <VueDraggableResizable :x="50" :y="50" :w="200" :h="200" :parent="true" :is-conflict-check="true" :snap="true">
        <div class="test1"></div>
      </VueDraggableResizable>
      <VueDraggableResizable :x="50" :y="50" :w="200" :h="200" :parent="true" :is-conflict-check="true" :snap="true" :snap-tolerance="20">
        <div class="test2"></div>
      </VueDraggableResizable>
      <VueDraggableResizable :x="50" :y="50" :w="200" :h="200" :parent="true" :is-conflict-check="true">
        <div class="test4"></div>
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
  .parents {
    height: 850px;
    width: 1700px;
    margin: 20px;
    border: 1px solid red;
    position: relative;
  }
  .test1{
    width: 100%;
    height: 100%;
    background: #41B883;
  }
  .test2{
    width: 100%;
    height: 100%;
    background: #1c87b8;
  }
  .test4{
    width: 100%;
    height: 100%;
    background: #ab77b8;
  }
</style>
