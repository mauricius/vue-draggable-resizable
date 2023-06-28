# Basic component with Drag Handle

A basic component, that can be dragged only through a handle, specified by the prop <b>`drag-handle`</b> and a valid CSS selector.

~~~js
<vue-draggable-resizable style="border: 1px solid black;" :drag-handle="'.drag-handle'">
  <div class="drag-handle">Drag Only Here</div>
</vue-draggable-resizable>
~~~

