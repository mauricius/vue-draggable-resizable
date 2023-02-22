import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'

const Basic = {
  render: ({}) => ({
    components: { VueDraggableResizable },
    template: `
      <vue-draggable-resizable>
        <p>You can drag me around and resize me as you wish.</p>
      </vue-draggable-resizable>
    `
  }),
  parameters: {
    controls: { include: [] }
  }
}

export default Basic
