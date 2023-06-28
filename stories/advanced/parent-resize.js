import Vue from 'vue'

export default () => ({
  template: `
    <div style="position: relative; height: 400px; border: 1px solid blue; margin: 1em; box-sizing: border-box">
      <vue-draggable-resizable :w="200" :h="200" :parent="true">
        <p>Try to resize the window. The component will adapt to the new parent size.</p>
      </vue-draggable-resizable>
    </div>
  `
})