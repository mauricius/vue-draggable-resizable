import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'

const CancelHandle = {
  render: ({}) => ({
    components: { VueDraggableResizable },
    template: `
      <vue-draggable-resizable style="border: 1px solid black;" :drag-cancel="'.drag-cancel'">
        <div class="drag-cancel">Cannot Drag Here</div>
      </vue-draggable-resizable>
    `
  }),
  parameters: {
    controls: { include: [] }
  }
}

export default CancelHandle
