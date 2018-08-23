import Vue from 'vue'

const style = {
  border: 'dashed 1px black'
};

export default () => ({
  template: `
    <vue-draggable-resizable v-bind:style='${JSON.stringify(style)}' :disableUserSelect="false">
      <p>You can still select text inside the component by putting <b>:disableUserSelect</b> prop equal to false.</p>
    </vue-draggable-resizable>
  `
})