# Component with Aspect Ratio costrained on 20x20 Grid

Having a component costrained on a Grid doesn't play so well when using the `lock-aspect-ratio`. You can notice that you have different results by dragging, for example, the right handle or the bottom handle.

~~~js
<vue-draggable-resizable :lock-aspect-ratio="true" :grid=[20,20]>
  <p>Keep aspect ratio in component costrained on grid.</p>
</vue-draggable-resizable>
~~~

