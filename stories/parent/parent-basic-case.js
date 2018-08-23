import Vue from 'vue'

export default () => ({
  template: `
    <div style="position: relative; height: 400px; border: 1px solid blue; margin: 1em;">
      <vue-draggable-resizable :parent="true">
        <p>You cannot move me or resize me outside my parent element.</p>
      </vue-draggable-resizable>
    </div>
  `
})