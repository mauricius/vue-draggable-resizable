import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'

const MaxWidthMaxHeight = {
  render: ({ maxWidth, maxHeight }) => ({
    components: { VueDraggableResizable },
    setup() {
      return { maxWidth, maxHeight };
    },
    template: `
      <vue-draggable-resizable :max-width="maxWidth" :max-height="maxHeight">
        <p>Basic component with programmable <b>maxWidth</b> and <b>maxHeight</b> props {{ maxHeight }}.</p>
      </vue-draggable-resizable>
    `
  }),
  args: {
    maxWidth: 300,
    maxHeight: 300
  },
  parameters: {
    controls: { include: ['maxWidth', 'maxHeight'] }
  }
}

export default MaxWidthMaxHeight
