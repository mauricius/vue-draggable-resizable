# Component with Aspect Ratio and Min Height, Min Width

A component, with <b>`lock-aspect-ratio`</b> prop and Min Height set to 100 and Min Width set to 50. Notice that locking the aspect ratio also forces the Min Width to be 100 (Factor: 1 / 1).

~~~js
<vue-draggable-resizable :lock-aspect-ratio="true" :minHeight="100" :minWidth="50">
  <p>Keep aspect ratio and set <b>minHeight</b> to 100 and <b>minWidth</b> to 50.</p>
</vue-draggable-resizable>
~~~

