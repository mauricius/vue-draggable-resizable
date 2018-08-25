import Vue from 'vue'

export default () => ({
  template: `
    <vue-draggable-resizable :w="200" :h="200" :x="0" :y="0" @resizing="onResize" @resizestop="onResizeStop">
      <p>{{ resizing ? 'You are resizing me crazy' : 'This is my favourite shape' }}<br>
      X: {{ x }} / Y: {{ y }} - Width: {{ width }} / Height: {{ height }}</p>
    </vue-draggable-resizable>
  `,
  data () {
    return {
      resizing: false,
      x: 0,
      y: 0,
      width: 200,
      height: 200
    }
  },
  methods: {
    onResize: function (x, y, width, height) {
      this.resizing = true
      this.x = x
      this.y = y
      this.width = width
      this.height = height
    },
    onResizeStop: function (x, y, width, height) {
      this.resizing = false

      console.log(arguments)
    }
  }
})