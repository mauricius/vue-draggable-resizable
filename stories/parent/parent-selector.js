import Vue from 'vue'

export default () => ({
  template: `
    <div class="parent" style="position: relative; height: 400px; width: 400px; border: 1px solid blue; margin: 1em;">
      <p style="position: absolute; bottom: 0; right: 0; margin: 0; color: blue">.parent</p>
      <div style="position: relative; height: 300px; width: 300px; border: 1px solid red;">
        <vue-draggable-resizable parent=".parent">
          <p>You cannot move me or resize me outside my external parent, identified by a CSS selector.</p>
        </vue-draggable-resizable>
      </div>
    </div>
  `
})