# onResizeStart callback

A component, with <b>`onResizeStart`</b> prop that accepts a function that gets called when dragging starts (element is clicked or touched). If the function returns `false`, the resizing action is cancelled. You can use this function to prevent bubbling of events.

~~~js
<vue-draggable-resizable :on-resize-start="onResizeStartCallback">
  <p>Passing a callback to the component that gets called as soon as the component is resized.</p>
</vue-draggable-resizable>

function onResizeStartCallback(handle, ev){
   ...
   // return false; — for cancel
}
~~~

