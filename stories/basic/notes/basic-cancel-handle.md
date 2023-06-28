# Basic component with Drag Cancel

A basic component, that cannot be dragged through a handle, specified by the prop <b>`drag-cancel`</b> and a valid CSS selector.

~~~js
<vue-draggable-resizable style="border: 1px solid black;" :drag-cancel="'.drag-cancel'">
  <div class="drag-cancel">Cannot Drag Here</div>
</vue-draggable-resizable>
~~~

