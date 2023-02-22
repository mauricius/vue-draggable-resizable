import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'

const NotResizable = {
  render: ({ resizable }) => ({
    components: { VueDraggableResizable },
    setup() {
      return { resizable };
    },
    template: `
      <vue-draggable-resizable :resizable.sync="resizable">
        <p>Basic component that is {{ resizable ? 'also' : 'not' }} resizable.</p>
      </vue-draggable-resizable>
    `
  }),
  args: {
    resizable: false
  },
  parameters: {
    controls: { include: ['resizable'] },
  }
}

export default NotResizable
