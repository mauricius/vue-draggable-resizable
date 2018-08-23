# Component costraind in parent

Component that cannot be dragged or resized outside element up in hierarchy, defined with the prop <b>`parent=".parent"`</b>. You can use any valid CSS selector.

~~~js
<div class="parent">
  <div class="intermediate">
    <vue-draggable-resizable parent=".parent">
      <p>You cannot move me or resize me outside my external parent, identified by a CSS selector.</p>
    </vue-draggable-resizable>
  </div>
</div>
~~~