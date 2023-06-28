import Vue from 'vue'

export default () => ({
  template: `
    <vue-draggable-resizable class-name-active="my-active-class" class-name="my-class">
      <p>You can provide a default class name for the component when it's active using the <b>class-name-active</b> prop.</p>
    </vue-draggable-resizable>
  `
})