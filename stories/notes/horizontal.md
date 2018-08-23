# Component costrained on x axis

Component that can be dragged and resized only on x axis. Drag constrain is defined using axis="x" prop, while resizing costrain can be achieved by defining only left and right handles :handles="['ml','mr']".

~~~js
<vue-draggable-resizable :parent="true" axis="x" :handles="['ml','mr']">
  <p>You can move me or resize me only horizontally.</p>
</vue-draggable-resizable>
~~~