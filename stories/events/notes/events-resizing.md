# Resizing and resizestop events

The `resizing(x, y, width, height)` event is emitted when the component is resized. The `resizestop(x, y, width, height)` event is emmitted when the resizing stops.

~~~js
<vue-draggable-resizable :w="200" :h="200" :x="0" :y="0" @resizing="onResize" @resizestop="onResizeStop">
  <p>{{ resizing ? 'You are resizing me crazy' : 'This is my favourite shape' }}</p>
</vue-draggable-resizable>

export default () => ({
  [...]

  methods: {
    onResize: function (x, y, width, height) {
      this.resizing = true
      this.x = x
      this.y = y
      this.width = width
      this.height = height
    },
    onResizeStop: function (x, y, width, height) {
      this.resizing = false
    }
  }
})
~~~

