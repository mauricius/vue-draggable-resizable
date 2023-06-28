# Component with grid costraind in parent

Component attached to a grid, that cannot be dragged or resized outside its parent element, defined with the prop <b>`:parent="true"`</b>. In this case the size of the parent matches perfectly the grid.

~~~js
<div>
  <vue-draggable-resizable :parent="true" :grid=[20,20]>
    <p>You cannot move me or resize me outside my parent.</p>
  </vue-draggable-resizable>
</div>
~~~