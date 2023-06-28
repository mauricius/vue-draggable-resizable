import Vue from 'vue'

export default () => ({
  template: `
    <div>
      <vue-draggable-resizable :lock-aspect-ratio="true" :maxWidth="300" :maxHeight="250" @resizing="onResizing">
        <p>Keep aspect ratio and set <b>maxWidth</b> to 300 and <b>maxHeight</b> to 250.</p>
      </vue-draggable-resizable>
      <div id="toolbar">
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
