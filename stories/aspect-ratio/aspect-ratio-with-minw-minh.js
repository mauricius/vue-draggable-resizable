import Vue from 'vue'

export default () => ({
  template: `
    <vue-draggable-resizable :lock-aspect-ratio="true" :minHeight="100" :minWidth="50">
      <p>Keep aspect ratio and set <b>minHeight</b> to 100 and <b>minWidth</b> to 50.</p>
    </vue-draggable-resizable>
  `
})
