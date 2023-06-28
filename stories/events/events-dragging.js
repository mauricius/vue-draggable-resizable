import Vue from 'vue'

export default () => ({
  template: `
    <vue-draggable-resizable :w="200" :h="200" @dragging="onDrag" @dragstop="onDragStop">
      <p>{{ dragging ? 'You are dragging me crazy' : 'Standing still' }}<br>X: {{ x }} / Y: {{ y }}</p>
    </vue-draggable-resizable>
  `,
  data () {
    return {
      dragging: false,
      x: 0,
      y: 0
    }
  },
  beforeDestroy: function () {
    clearTimeout(this.timer)
  },
  methods: {
    onDrag: function (x, y) {
      this.dragging = true
      this.x = x
      this.y = y
    },
    onDragStop: function (x, y) {
      this.dragging = false
    }
  }
})