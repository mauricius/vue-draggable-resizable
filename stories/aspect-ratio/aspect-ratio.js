import Vue from 'vue'

export default () => ({
  template: `
    <div>
      <vue-draggable-resizable :lock-aspect-ratio="ratio">
        <p>Keep aspect ratio using <b>:lock-aspect-ratio</b> prop.</p>
      </vue-draggable-resizable>
      <div id="toolbar">
        <input type="checkbox" v-model="ratio" /> Toggle Lock Aspect Ratio
      </div>
    </div>
  `,
  data() {
    return {
      ratio: true
    }
  }
})
