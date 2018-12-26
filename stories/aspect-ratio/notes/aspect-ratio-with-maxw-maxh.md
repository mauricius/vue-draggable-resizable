# Component with Aspect Ratio and maxWidth, maxHeight

A component, with <b>`lock-aspect-ratio`</b> prop and <b>maxWidth</b> set to `300` and <b>maxHeight</b> set to `250`. Notice that locking the aspect ratio also forces the max width to be 250.

~~~js
<vue-draggable-resizable :lock-aspect-ratio="true" :maxWidth="300" :maxHeight="250" @resizing="onResizing">
  <p>Keep aspect ratio and set <b>maxWidth</b> to 300 and <b>maxHeight</b> to 250.</p>
</vue-draggable-resizable>
~~~

