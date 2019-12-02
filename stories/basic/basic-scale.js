import Vue from 'vue'

export default () => ({
  template: `
    <div>
      <div v-bind:style="{ transform: 'scale(' + scale + ')' }">
        <vue-draggable-resizable :scale="scale">
          <p>Change the "scale" property to support CSS scale transform. Current value is {{ scale }}</p>
        </vue-draggable-resizable>

        <vue-draggable-resizable :x="250">
          <p>Component with default scale prop set to 1</p>
        </vue-draggable-resizable>
      </div>
      <div id="toolbar">
          <input type="range" min="0.1" max="2" step="0.1" v-model.number="scale">
          <label>Scale</label>
        </div>
    </div>
  `,
  data() {
    return {
      scale: 1
    }
  }
})