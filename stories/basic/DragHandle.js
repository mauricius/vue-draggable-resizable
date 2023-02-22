import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'

const DragHandle = {
  render: ({}) => ({
    components: { VueDraggableResizable },
    template: `
      <vue-draggable-resizable style="border: 1px solid black;" :drag-handle="'.drag-handle'">
        <div class="drag-handle">Drag Only Here</div>
      </vue-draggable-resizable>
    `
  }),
  parameters: {
    controls: { include: [] }
  }
}

export default DragHandle
