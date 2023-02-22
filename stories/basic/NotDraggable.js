import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'

const NotDraggable = {
  render: ({ draggable }) => ({
    components: { VueDraggableResizable },
    setup() {
      return { draggable };
    },
    template: `
      <vue-draggable-resizable :draggable="draggable">
        <p>Basic component that is {{ draggable ? 'also' : 'not' }} draggable.</p>
      </vue-draggable-resizable>
    `
  }),
  args: {
    draggable: false
  },
  parameters: {
    controls: { include: ['draggable'] },
  }
}

export default NotDraggable
