import Vue from 'vue'

const style = {
  'width': '100%',
  'height': '100%',
  'backgroundColor': 'red'
}

export default () => ({
  template: `
    <div>
      <vue-draggable-resizable :on-resize="onResize" :w="100" :h="100" :draggable="false" :handles="handles">
        <div slot="mr" v-if="handle === 'mr'"  :style='${JSON.stringify(style)}'></div>
        <div slot="br" v-if="handle === 'br'" :style='${JSON.stringify(style)}'></div>
        <div slot="bm" v-if="handle === 'bm'" :style='${JSON.stringify(style)}'></div>
      </vue-draggable-resizable>
      <div style="width: 200px; height: 200px; background-color: red; position: absolute; top: 200px; left: 200px; text-align: center; font-size: 24px">
        Can't touch me
      </div>
    </div>
  `,
  data() {
    return {
      handles: ['mr', 'br', 'bm'],
      handle: null
    }
  },
  methods: {
    onResize(handle, x, y, width, height) {
      this.handle = handle

      if (width > 200 && height > 200) {
        return false
      }
    }
  }
})
