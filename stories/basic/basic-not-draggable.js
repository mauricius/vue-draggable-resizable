import Vue from 'vue'

export default () => ({
  template: `
    <div>
      <vue-draggable-resizable :draggable="draggable">
        <p>Basic component that is {{ draggable ? 'also' : 'not' }} draggable.</p>
      </vue-draggable-resizable>
      <div id="toolbar">
        <input type="checkbox" v-model="draggable" id="draggable" /> Toggle draggable
      </div>
    </div>
  `,
   data() {
    return {
      draggable: false
    }
  }
})