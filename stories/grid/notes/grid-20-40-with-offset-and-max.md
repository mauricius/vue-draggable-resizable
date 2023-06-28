# Grid 20x40 pixels with 10x10 offset and maxHeight, maxWidth values

If you provide `maxHeight` and `maxWidth` values that are higer than the respective grid values, you can notice that resizing stops to the lower suitable value. For example on the `x` axis the lowest valid value that respects `maxWidth` and `grid[x]` constraint is 80. The same applies for the `y` axis.

~~~js
<vue-draggable-resizable :grid="[20,40]" :x="10" :y="20" :maxHeight="290" :maxWidth="290">
  <p>Grid 20x40 starting with a 10x20 offset and max height, max width values equal to 290.</p>
</vue-draggable-resizable>
~~~

