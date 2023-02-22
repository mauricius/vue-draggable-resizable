import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'

const ZIndex = {
  render: ({ z }) => ({
    components: { VueDraggableResizable },
    setup() {
      return { z };
    },
    template: `
      <div>
        <vue-draggable-resizable :z="z">
          <p>Controlling the z-index from outside the component by providing the <b>:z</b> prop.</p>
        </vue-draggable-resizable>
        <div style="width: 200px; height: 200px; background-color: red; position: absolute; top: 100px; left: 100px; z-index: 1; text-align: center; font-size: 24px">
          1
        </div>
        <div style="width: 300px; height: 300px; background-color: green; position: absolute; top: 200px; left: 200px; z-index: 9; text-align: center; font-size: 24px">
          9
        </div>
      </div>
    `,
  }),
  args: {
    z: 0
  },
  parameters: {
    controls: { include: ['z'] }
  }
}

export default ZIndex
