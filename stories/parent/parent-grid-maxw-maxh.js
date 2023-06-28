import Vue from 'vue'

const style = {
    position: 'relative',
    backgroundColor: '#808080',
    background: 'linear-gradient(-90deg, rgba(0, 0, 0, .1) 1px, transparent 1px), linear-gradient(rgba(0, 0, 0, .1) 1px, transparent 1px)',
    backgroundSize: '10px 20px, 10px 20px',
    height: '400px',
    width: '400px',
    border: '1px solid blue',
    margin: '1em'
}

export default () => ({
  template: `
    <div>
      <div :style='${JSON.stringify(style)}'>
        <vue-draggable-resizable :parent="true" :max-width="290" :max-height="290" @resizing="onResizing" :grid="[10,20]">
          <p>Component costrained in parent with <b>maxWidth</b> and <b>maxHeight</b> equal to 290.</p>
        </vue-draggable-resizable>
      </div>
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
