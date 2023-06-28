import Vue from 'vue'

export default () => ({
  template: `
    <div>
      <vue-draggable-resizable :resizable.sync="resizable">
        <p>Basic component that is {{ resizable ? 'also' : 'not' }} resizable.</p>
      </vue-draggable-resizable>
      <div id="toolbar">
        <input type="checkbox" v-model="resizable" /> Toggle resizable
      </div>
    </div>
  `,
  data() {
    return {
      resizable: false
    }
  }
})