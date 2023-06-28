import Vue from 'vue'

export default () => ({
  template: `
    <div>
      <vue-draggable-resizable :active.sync="active">
        <p>Controlling the active state from outside the component by providing the <b>:active</b> prop.</p>
      </vue-draggable-resizable>
      <div id="toolbar">
        <input type="checkbox" v-model="active" /> Toggle Active
      </div>
    </div>
  `,
  data() {
    return {
      active: false
    }
  },
  methods: {
    toggle() {
      this.active = !this.active
    }
  }
})