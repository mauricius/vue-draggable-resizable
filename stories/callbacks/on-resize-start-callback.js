import Vue from 'vue'

export default () => ({
  template: `
    <div>
      <vue-draggable-resizable :on-resize-start="onResizeStart">
        <p v-if="clicked">Start resizing!</p>
      </vue-draggable-resizable>
      <div id="toolbar">
        <input type="checkbox" v-model="prevent" /> Prevent resizing
      </div>
    </div>
  `,
  data() {
    return {
      prevent: false,
      clicked: false
    }
  },
  methods: {
    onResizeStart(e) {
      if (this.prevent) {
        return false
      }

      this.clicked = true

      setTimeout(() => {
        this.clicked = false
      }, 1000)
    }
  }
})
