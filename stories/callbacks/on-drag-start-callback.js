import Vue from 'vue'

export default () => ({
  template: `
    <div>
      <vue-draggable-resizable :on-drag-start="onDragStart">
        <p v-if="clicked">Start dragging!</p>
      </vue-draggable-resizable>
      <div id="toolbar">
        <input type="checkbox" v-model="prevent" /> Prevent dragging
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
    onDragStart(e) {
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
