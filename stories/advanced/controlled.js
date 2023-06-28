import Vue from 'vue'

const box = {
  top: 100,
  left: 300,
  width: 200,
  height: 200,
}

export default () => ({
  template: `
    <div style="position: relative; height: 400px; border: 1px solid blue; margin: 1em; box-sizing: border-box">
      <vue-draggable-resizable :x="x" :y="y" :width="width" :height="height" :onDragStart="onDragStart" @dragging="onDragging" @resizing="onResizing">
        <p>{{ x }}, {{ y }}, {{ width }}x{{ height }}</p>
      </vue-draggable-resizable>
      <div id="toolbar">
        <button @click="left">Left</button>
        <button @click="right">Right</button>
        <button @click="up">Up</button>
        <button @click="down">Down</button>
      </div>
    </div>
  `,
  data() {
    return {
      x: 0,
      y: 0,
      width: 200,
      height: 200
    }
  },
  methods: {
    left() {
      this.x = this.x - 1
    },
    right() {
      this.x = this.x + 1
    },
    up() {
      this.y = this.y - 1
    },
    down() {
      this.y = this.y + 1
    },
    onDragging(x, y) {
      this.x = x;
      this.y = y;
    },
    onResizing(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width
      this.height = height
    }
  },
  computed: {
    collision: function() {
      return (
        (this.x < (box.left + box.width)) &&
        ((this.x + this.width) > box.left) &&
        (this.y < (box.top + box.height)) &&
        ((this.y + this.height) > box.top)
      )
    },
    activeColor: function() {
      if (this.collision) {
        return 'red'
      } else {
        return 'green'
      }
    }
  }
})
