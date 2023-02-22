import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'

const BasicAxis = {
  render: ({ axis }) => ({
    components: { VueDraggableResizable },
    setup() {
      return { axis }
    },
    template: `
      <vue-draggable-resizable :axis="axis">
        <p>Draggable on {{ axis }} axis.</p>
      </vue-draggable-resizable>
    `
  }),
  args: {
    axis: 'x'
  },
  parameters: {
    controls: { include: ['axis'] },
  }
}

export default BasicAxis
