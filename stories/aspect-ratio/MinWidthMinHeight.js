import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'

const MinWidthMinHeight = {
  render: ({ lockAspectRatio, minWidth, minHeight }) => ({
    components: { VueDraggableResizable },
    setup() {
      return {
        lockAspectRatio,
        minWidth,
        minHeight
      };
    },
    template: `
      <vue-draggable-resizable :lock-aspect-ratio="true" :minWidth="minWidth" :minHeight="minHeight">
        <p>Keep aspect ratio and set <b>minWidth</b> to {{ minWidth }} and <b>minHeight</b> to {{ minHeight }}.</p>
      </vue-draggable-resizable>
    `
  }),
  args: {
    lockAspectRatio: true,
    minWidth: 50,
    minHeight: 100
  },
  parameters: {
    controls: { include: ['lockAspectRatio', 'minWidth', 'minHeight'] }
  }
}

export default MinWidthMinHeight
