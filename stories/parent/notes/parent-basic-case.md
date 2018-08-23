# Component costraind in parent

Component that cannot be dragged or resized outside its parent element, defined with the prop <b>`:parent="true"`</b>.

~~~js
<vue-draggable-resizable :parent="true">
  <p>You cannot move or resize me outside my parent element.</p>
</vue-draggable-resizable>
~~~