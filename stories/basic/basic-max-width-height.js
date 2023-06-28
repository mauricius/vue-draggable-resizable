import Vue from 'vue'

export default () => ({
  template: `
    <div>
      <vue-draggable-resizable :max-width="maxWidth" :max-height="maxHeight">
        <p>Basic component with programmable <b>maxWidth</b> and <b>maxHeight</b> props.</p>
      </vue-draggable-resizable>
      <div id="toolbar">
        Max Width: <input type="number" v-model.number="maxWidth" />
        Max Height: <input type="number" v-model.number="maxHeight" />
      </div>
    </div>
  `,
  data() {
    return {
      maxWidth: 300,
      maxHeight: 300
    }
  }
})
