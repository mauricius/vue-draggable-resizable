# Component with custom class name on dragging

Component with a custom class name on dragging, provided with the prop <b>`class-name-dragging`</b>.

~~~js
<vue-draggable-resizable class-name-dragging="my-dragging-class" class-name="my-class">
  <p>You can provide a default class name for the component when it's dragging using the <b>class-name-dragging</b> prop.</p>
</vue-draggable-resizable>
~~~

~~~css
.my-class {
    background-color: green;
    border: 1px solid red;
    -webkit-transition: background-color 200ms linear;
    -ms-transition: background-color 200ms linear;
    transition: background-color 200ms linear;
}

.my-dragging-class {
    background-color: red;
    border: 1px solid black;
}
~~~