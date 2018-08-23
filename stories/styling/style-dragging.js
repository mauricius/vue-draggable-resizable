import Vue from 'vue'

export default () => ({
  template: `
    <vue-draggable-resizable class-name-dragging="my-dragging-class" class-name="my-class">
      <p>You can provide a default class name for the component when it's dragging using the <b>class-name-dragging</b> prop.</p>
    </vue-draggable-resizable>
  `
})