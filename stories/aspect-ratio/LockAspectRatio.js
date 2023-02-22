import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'

const LockAspectRatio = {
  render: ({ lockAspectRatio }) => ({
    components: { VueDraggableResizable },
    setup() {
      return { lockAspectRatio };
    },
    template: `
      <vue-draggable-resizable :lock-aspect-ratio="lockAspectRatio">
        <p>Keep aspect ratio using <b>:lock-aspect-ratio</b> prop.</p>
      </vue-draggable-resizable>
    `
  }),
  args: {
    lockAspectRatio: true
  },
  parameters: {
    controls: { include: ['lockAspectRatio'] }
  }
}

export default LockAspectRatio
