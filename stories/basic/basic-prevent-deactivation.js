import Vue from 'vue'

export default () => ({
  template: `
    <vue-draggable-resizable :prevent-deactivation="true">
      <p>Prevents the deactivation of the component by providing the <b>:prevent-deactivation</b> prop.</p>
    </vue-draggable-resizable>
  `
})