# Grid 20x40 pixels with 10x10 offset and minHeight, minWidth values

If you provide `minHeight` and `minWidth` values that are lower than the respective grid values, you can notice that resizing stops to the lowest suitable value. For example on the `x` axis the lowest valid value that respects `minWidth` and `grid[x]` constraint is 40. The same applies for the `y` axis.

~~~js
<vue-draggable-resizable :grid="[20,40]" :x="10" :y="20" :minHeight="30" :minWidth="30">
  <p>Grid 20x40 starting with a 10x20 offset and min height, min width values equal to 30.</p>
</vue-draggable-resizable>
~~~

