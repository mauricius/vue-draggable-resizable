# Component costraind in parent and on a grid with an even 17x17 offset

Component attached to a grid with an even offset.

~~~js
<div>
  <vue-draggable-resizable :parent="true" :grid=[20,20] :x="17" :y="17" :width="200" :height="200">
    <p>You cannot move me or resize me outside my parent.</p>
  </vue-draggable-resizable>
</div>
~~~