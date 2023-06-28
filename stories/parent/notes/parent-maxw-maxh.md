# Component costrained in parent with maxWidth and maxHeight

Component that cannot be dragged or resized outside its parent element, with <b>maxWidth</b> and <b>maxHeight</b> props to limit its size.

~~~js
<vue-draggable-resizable :parent="true" :max-width="300" :max-height="300">
  <p>Component costrained in parent with <b>maxWidth</b> and <b>maxHeight</b> equal to 300.</p>
</vue-draggable-resizable>
~~~
