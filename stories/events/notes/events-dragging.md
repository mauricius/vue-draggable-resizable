# Dragging and dragstop events

The `dragging(x, y)` event is emitted when the component is dragged. The `dragstop(x, y)` event is emmitted when the dragging stops.

~~~js
<vue-draggable-resizable :w="200" :h="200" @dragging="onDrag" @dragstop="onDragStop">
  <p>{{ dragging ? 'You are dragging me crazy' : 'Standing still' }}</p>
</vue-draggable-resizable>

export default () => ({
  [...]

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
~~~

