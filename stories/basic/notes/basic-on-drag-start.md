# Basic component with onDragStart callback

A basic component, with <b>`onDragStart`</b> prop that accepts a function that gets called when dragging starts (element is clicked or touched). If the function returns `false`, the action is cancelled. You can use this function to prevent bubbling of events.

~~~js
<vue-draggable-resizable :on-drag-start="onDragStartCallback">
  <p>Passing a callback to the component that gets called as soon as the component is clicked.</p>
</vue-draggable-resizable>

function onDragStartCallback(ev){
   ...
   // return false; — for cancel
}
~~~

