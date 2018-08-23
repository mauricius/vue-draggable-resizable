# Component with custom class name on resizing

Component with a custom class name on resizing, provided with the prop <b>`class-name-resizing`</b>.

~~~js
<vue-draggable-resizable class-name-resizing="my-resizing-class" class-name="my-class">
  <p>You can provide a default class name for the component when it's resizing using the <b>class-name-resizing</b> prop.</p>
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

.my-resizing-class {
    background-color: blue;
    border: 1px solid black;
    color: white;
}
~~~