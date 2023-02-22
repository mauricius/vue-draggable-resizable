import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'

const MaxWidthMaxHeight = {
  render: ({ lockAspectRatio, maxWidth, maxHeight }) => ({
    components: { VueDraggableResizable },
    setup() {
      return {
        lockAspectRatio,
        maxWidth,
        maxHeight
      };
    },
    template: `
      <vue-draggable-resizable :lock-aspect-ratio="true" :maxWidth="maxWidth" :maxHeight="maxHeight">
        <p>Keep aspect ratio and set <b>maxWidth</b> to {{ maxWidth }} and <b>maxHeight</b> to {{ maxHeight }}.</p>
      </vue-draggable-resizable>
    `
  }),
  args: {
    lockAspectRatio: true,
    maxWidth: 300,
    maxHeight: 250
  },
  parameters: {
    controls: { include: ['lockAspectRatio', 'maxWidth', 'maxHeight'] }
  }
}

export default MaxWidthMaxHeight
