import Vue from 'vue'

export default () => ({
  template: `
    <div>
      <vue-draggable-resizable :axis="axis">
        <p>Draggable on {{ axis }} axis.</p>
      </vue-draggable-resizable>
      <div id="toolbar">
        <label>
          <input type="checkbox" v-model="x" /> X
        </label>
        <label>
          <input type="checkbox" v-model="y" /> Y
        </label>
      </div>
    </div>
  `,
  data() {
    return {
      x: true,
      y: true
    }
  },
  computed: {
    axis() {
      if (this.x && this.y) return 'both'

      if (this.x) return 'x'

      if (this.y) return 'y'

      return false
    }
  }
})