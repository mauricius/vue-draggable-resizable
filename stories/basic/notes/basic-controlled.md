# Basic controlled component

A basic controlled component, with <b>`x`</b>, <b>`y`</b>, <b>`w`</b> and <b>`h`</b> props to control the position and the size of the component. You should also
provide callbacks to sync the state with the parent.

~~~js
<vue-draggable-resizable :x="x" :y="y" :w="w" :h="h" @resizing="onResize" @dragging="onDrag">
  <p>Basic controlled component.</p>
</vue-draggable-resizable>

methods: {
  onDrag(left, top) {
    this.x = left
    this.y = top
  },
  onResize(left, top, width, height) {
    this.x = left
    this.y = top
    this.w = width
    this.h = height
  }
}
~~~

