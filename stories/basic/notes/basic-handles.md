# Basic component with handles prop

You can choose what handles to provide to the component using the <b>`handles`</b> prop, which accepts an array of handles. For example, if you want to costrain resizing only on horizontal axis you can provide only left and right handles `:handles="['ml','mr']"`.

~~~js
<vue-draggable-resizable :prevent-deactivation="true" :handles="['tl','tm','tr','mr','br','bm','bl','ml']">
  <p>Enable/disable handles.</p>
</vue-draggable-resizable>
~~~

