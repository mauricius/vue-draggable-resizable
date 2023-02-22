import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'

const ControlledComponent = {
  render: ({ x, y, w, h }) => ({
    components: { VueDraggableResizable },
    setup() {
      return { x, y, h, w };
    },
    template: `
      <vue-draggable-resizable :x="x" :y="y" :w="w" :h="h">
        <p>Basic controlled component.</p>
      </vue-draggable-resizable>
    `,
  }),
  args: {
    x: 0,
    y: 0,
    w: 100,
    h: 100
  },
  parameters: {
    controls: { include: ['x', 'y', 'w', 'h'] }
  }
}

export default ControlledComponent
