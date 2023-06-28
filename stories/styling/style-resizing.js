import Vue from 'vue'

export default () => ({
  template: `
    <vue-draggable-resizable class-name-resizing="my-resizing-class" class-name="my-class">
      <p>You can provide a default class name for the component when it's resizing using the <b>class-name-resizing</b> prop.</p>
    </vue-draggable-resizable>
  `
})