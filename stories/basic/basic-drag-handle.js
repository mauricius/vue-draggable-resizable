import Vue from 'vue'

export default () => ({
  template: `
    <vue-draggable-resizable style="border: 1px solid black;" :drag-handle="'.drag-handle'">
      <div class="drag-handle">Drag Only Here</div>
    </vue-draggable-resizable>
  `
})