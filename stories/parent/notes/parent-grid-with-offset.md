# Component costraind in parent and on a grid with 10x10 offset

Component attached to a grid with a small offset. Its starting position is not perfectly aligned with the top-left corner of the parent.

~~~js
<div>
  <vue-draggable-resizable :parent="true" :grid=[20,20] :x="10" :y="10" :width="200" :height="200">
    <p>You cannot move me or resize me outside my parent. And my edges cannot touch the parent element.</p>
  </vue-draggable-resizable>
</div>
~~~