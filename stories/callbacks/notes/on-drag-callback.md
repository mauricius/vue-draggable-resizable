# onDrag callback

A component with <b>`onDrag`</b> prop that accepts a function that gets called on dragging. If the function returns `false`, the drag action is cancelled.

~~~js
<vue-draggable-resizable :on-drag="onDragCallback">
</vue-draggable-resizable>

function onDragStartCallback(x, y){
  if ((x > 100 && x < 400) && (y > 100 && y < 400)) {
    return false
  }
}
~~~

