import Vue from 'vue'

const style = {
    position: 'relative',
    backgroundColor: '#808080',
    background: 'linear-gradient(-90deg, rgba(0, 0, 0, .1) 1px, transparent 1px), linear-gradient(rgba(0, 0, 0, .1) 1px, transparent 1px)',
    backgroundSize: '20px 40px, 20px 40px',
    backgroundPosition: '10px 20px'
}

export default () => ({
  template: `
    <div :style='${JSON.stringify(style)}'>
      <vue-draggable-resizable :grid="[20,40]" :x="10" :y="20" :maxHeight="290" :maxWidth="290" @resizing="onResizing">
        <p>Grid 20x40 starting with a 10x20 offset and max height, max width values equal to 290.</p>
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
