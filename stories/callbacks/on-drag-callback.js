import Vue from 'vue'

export default () => ({
  template: `
    <div>
      <vue-draggable-resizable :on-drag="onDrag" :w="100" :h="100" :resizable="false">
      </vue-draggable-resizable>
      <div style="width: 200px; height: 200px; background-color: red; position: absolute; top: 200px; left: 200px; text-align: center; font-size: 24px">
        Can't touch me
      </div>
    </div>
  `,
  methods: {
    onDrag(x, y) {
      if ((x > 100 && x < 400) && (y > 100 && y < 400)) {
        return false
      }
    }
  }
})
