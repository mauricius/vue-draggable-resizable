import Vue from 'vue'

export default () => ({
  template: `
    <vue-draggable-resizable style="border: 1px solid black;" :drag-cancel="'.drag-cancel'">
      <div class="drag-cancel">Cannot Drag Here</div>
    </vue-draggable-resizable>
  `
})