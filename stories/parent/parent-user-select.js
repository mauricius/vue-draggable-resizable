import Vue from 'vue'

const style = {
  border: 'dashed 1px black'
};

export default () => ({
  template: `
    <div>
      <div style="position: relative; height: 300px; border: 1px solid blue; margin: 1em;">
        <vue-draggable-resizable :parent="true" :disableUserSelect="disableUserSelect">
          <p>You can {{ disableUserSelect ? 'not' : '' }} select text inside the component by putting <b>:disableUserSelect</b> prop equal to {{ disableUserSelect }}.</p>
        </vue-draggable-resizable>
      </div>
      <div id="toolbar">
        <input type="checkbox" v-model="disableUserSelect" /> Toggle disableUserSelect
      </div>
    </div>
  `,
   data() {
    return {
      disableUserSelect: false
    }
  }
})
