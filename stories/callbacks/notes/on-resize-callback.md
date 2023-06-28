# onResize callback

A component with <b>`onResize`</b> prop that accepts a function that gets called on resizing. If the function returns `false`, the action is cancelled.

~~~js
<vue-draggable-resizable :on-resize="onResizeCallback"></vue-draggable-resizable>

function onResizeCallback(handle, x, y, width, height){
  if (width > 200 && height > 200) {
    return false
  }
}
~~~
