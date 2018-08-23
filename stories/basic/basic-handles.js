import Vue from 'vue'

export default () => ({
  template: `
    <div>
      <vue-draggable-resizable :handles="enabledHandles" :prevent-deactivation="true" :w="250" :h="250">
        <p>Enable/disable handles.</p>
        <ul>
          <li v-for="handle in Object.keys(handles)" :key="handle">{{ handle }} - {{ handles[handle] ? '&check;' : '&cross;' }}</li>
        </ul>
      </vue-draggable-resizable>
      <div id="toolbar">
        <label v-for="handle in Object.keys(handles)" :key="handle">
          <input type="checkbox"  v-model="handles[handle]" /> {{ handle }}
        </label>
      </div>
    </div>
  `,
  data() {
    return {
      handles: {
        'tl': true,
        'tm': true,
        'tr': true,
        'mr': true,
        'br': true,
        'bm': true,
        'bl': true,
        'ml': true
      }
    }
  },
  computed: {
    enabledHandles() {
      return Object.keys(this.handles).filter(handle => this.handles[handle] === true)
    }
  }
})