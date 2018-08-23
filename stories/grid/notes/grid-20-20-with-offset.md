# Grid 20x20 pixels with 10x10 offset

The grid is always calculated from the upper-left corner of the component. In this example you can see that it has an offset relative to the parent element. This is important for components costrained in parent elements.

~~~js
<vue-draggable-resizable :grid="[20,20]" :x="10" :y="10">
  <p>Grid 20x20 starting with a 10x10 offset</p>
</vue-draggable-resizable>
~~~

