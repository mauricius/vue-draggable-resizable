# Component with grid costraind in parent with maxWidth and maxHeight

Component attached to a grid, that cannot be dragged or resized outside its parent element, with <b>maxWidth</b> and <b>maxHeight</b> props to limit its size. __Notice__ that using `20` as `grid` prop for the <b>y axis</b>, the `maxHeight` of the element is `280` instead of `290`.

~~~js
<div>
  <vue-draggable-resizable :parent="true" :max-width="290" :max-height="290" :grid="[10,20]">
    <p>Component costrained in parent with <b>maxWidth</b> and <b>maxHeight</b> equal to 290.</p>
  </vue-draggable-resizable>
</div>
~~~
