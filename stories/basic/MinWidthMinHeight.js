import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'

const MinWidthMinHeight = {
  render: ({ minWidth, minHeight }) => ({
    components: { VueDraggableResizable },
    setup() {
      return { minWidth, minHeight };
    },
    template: `
      <vue-draggable-resizable :min-width="minWidth" :min-height="minHeight">
        <p>Basic component with programmable <b>minWidth</b> and <b>minHeight</b> props.</p>
      </vue-draggable-resizable>
    `
  }),
  args: {
    minWidth: 100,
    minHeight: 100
  },
  parameters: {
    controls: { include: ['minWidth', 'minHeight'] }
  }
}

export default MinWidthMinHeight
