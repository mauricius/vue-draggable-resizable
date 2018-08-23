# Component with custom class name handles

Component with a custom class for handle, provided with the prop <b>`class-name-handle`</b>. In this way you can style each handle separately.

__Remember to set `position: absolute` for the handle class__

~~~js
<vue-draggable-resizable class-name-handle="my-handle-class">
  <p>You can provide a default class name for handle using the <b>class-name-handle</b> prop.</p>
</vue-draggable-resizable>
~~~

~~~css
.my-handle-class {
    position: absolute.
    background-color: pink;
    border: 1px solid black;
    border-radius: 50%;
    height: 14px;
    width: 14px;
    box-model: border-box;
    -webkit-transition: all 300ms linear;
    -ms-transition: all 300ms linear;
    transition: all 300ms linear;
}

.my-handle-class-tl {
  top: -14px;
  left: -14px;
  cursor: nw-resize;
}

.my-handle-class-tm {
  top: -14px;
  left: 50%;
  margin-left: -7px;
  cursor: n-resize;
}

.my-handle-class-tr {
  top: -14px;
  right: -14px;
  cursor: ne-resize;
}

.my-handle-class-ml {
  top: 50%;
  margin-top: -7px;
  left: -14px;
  cursor: w-resize;
}

.my-handle-class-mr {
  top: 50%;
  margin-top: -7px;
  right: -14px;
  cursor: e-resize;
}

.my-handle-class-bl {
  bottom: -14px;
  left: -14px;
  cursor: sw-resize;
}

.my-handle-class-bm {
  bottom: -14px;
  left: 50%;
  margin-left: -7px;
  cursor: s-resize;
}

.my-handle-class-br {
  bottom: -14px;
  right: -14px;
  cursor: se-resize;
}

.my-handle-class-tl:hover,
.my-handle-class-tr:hover,
.my-handle-class-bl:hover,
.my-handle-class-br:hover {
    background-color: red;
    transform: scale(1.4);
}
~~~