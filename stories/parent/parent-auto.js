import Vue from 'vue'

export default () => ({
  template: `
    <div style="position: relative; height: 400px; border: 1px solid blue; margin: 1em;">
      <vue-draggable-resizable :parent="true" w="auto" h="auto">
        <p>Component with "auto" size.</p>
      </vue-draggable-resizable>
    </div>
  `
})
