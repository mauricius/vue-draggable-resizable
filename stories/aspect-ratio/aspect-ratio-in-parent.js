import Vue from 'vue'

export default () => ({
  template: `
    <div style="position: relative; height: 400px; border: 1px solid blue; margin: 1em;">
      <vue-draggable-resizable :lock-aspect-ratio="true" :parent="true">
        <p>Combine aspect ratio and costrain in parent.</p>
      </vue-draggable-resizable>
    </div>
  `
})