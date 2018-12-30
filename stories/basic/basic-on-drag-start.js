import Vue from 'vue'

export default () => ({
  template: `
    <div>
      <vue-draggable-resizable :on-drag-start="onDragStart">
      </vue-draggable-resizable>
      <div id="toolbar">
        <p :style="style">I turn red when <i>onDragStart</i> is called. Callback then prevents activation.</p>
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
    onDragStart(e) {
      this.style.color = 'red'

      return false
    }
  }
})
