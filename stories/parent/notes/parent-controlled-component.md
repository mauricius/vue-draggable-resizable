# Parent controlled Component with Grid

A basic parent controlled component, with <b>`x`</b>, <b>`y`</b>, <b>`w`</b> and <b>`h`</b> props to control the position and the size of the component. __Notice__ that using also the `grid` prop, the component will react only with a valid multiple of grid values.

~~~js
<vue-draggable-resizable :parent="true" :grid=[20,20] :x="x" :y="y" :h="h" :w="w" @dragging="onDrag" @resizing="onResize">
  <p>You cannot move me or resize me outside my parent.</p>
</vue-draggable-resizable>
~~~