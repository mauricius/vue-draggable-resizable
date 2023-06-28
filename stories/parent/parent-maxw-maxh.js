import Vue from 'vue'

export default () => ({
  template: `
    <div>
      <div style="position: relative; height: 400px; border: 1px solid blue; margin: 1em;">
        <vue-draggable-resizable :parent="true" :max-width="300" :max-height="300" @resizing="onResizing">
          <p>Component costrained in parent with <b>maxWidth</b> and <b>maxHeight</b> equal to 300.</p>
        </vue-draggable-resizable>
      </div>
      <div id="toolbar" style="padding: 1em">
        Size: {{ width }} x {{ height }}
      </div>
    </div>
  `,
  data() {
    return {
      width: 200,
      height: 200
    }
  },
  methods: {
    onResizing(x, y, width, height) {
      this.width = width
      this.height = height
    }
  }
})
