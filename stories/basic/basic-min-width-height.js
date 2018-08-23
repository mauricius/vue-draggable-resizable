import Vue from 'vue'

export default () => ({
  template: `
    <div>
      <vue-draggable-resizable :min-width="minWidth" :min-height="minHeight">
        <p>Basic component with programmable <b>minWidth</b> and <b>minHeight</b> props.</p>
      </vue-draggable-resizable>
      <div id="toolbar">
        Min Width: <input type="number" v-model="minWidth" />
        Min Height: <input type="number" v-model="minHeight" />
      </div>
    </div>
  `,
  data() {
    return {
      minWidth: 0,
      minHeight: 0
    }
  }
})