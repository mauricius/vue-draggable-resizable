import Vue from 'vue'

export default () => ({
  template: `
    <vue-draggable-resizable :w="200" :h="200" @activated="onActivated">
      <p v-if="active">The component has been activated.</p>
    </vue-draggable-resizable>
  `,
  data () {
    return {
      active: false,
      timer: null
    }
  },
  beforeDestroy: function () {
    clearTimeout(this.timer)
  },
  methods: {
    onActivated () {
      this.active = true

      this.timer = setTimeout(() => {
        this.active = false
      }, 1000)
    }
  }
})