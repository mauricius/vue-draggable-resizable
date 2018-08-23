# Component costrained on y axis

Component that can be dragged and resized only on y axis. Drag constrain is defined using `axis="y"` prop, while resizing costrain can be achieved by defining only top and bottom handles `:handles="['tc','bc']"`.

~~~js
<vue-draggable-resizable :parent="true" axis="y" :handles="['tm','bm']">
  <p>You can move me or resize me only vertically.</p>
</vue-draggable-resizable>
~~~