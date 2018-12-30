import Vue from 'vue'

export default () => ({
  template: `
    <div>
      <vue-draggable-resizable :on-resize-start="onResizeStart">
      </vue-draggable-resizable>
      <div id="toolbar">
        <p :style="style">I turn red when <i>onResizeStart</i> is called. Callback then prevents resizing.</p>
      </div>
    </div>
  `,
  data() {
    return {
      style: {
        color: 'black'
      }
    }
  },
  methods: {
    onResizeStart(e) {
      this.style.color = 'red'

      return false
    }
  }
})
