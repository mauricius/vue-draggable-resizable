import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'

const InParent = {
  render: ({ lockAspectRatio, parent }) => ({
    components: { VueDraggableResizable },
    setup() {
      return {
        lockAspectRatio,
        parent
      };
    },
    template: `
      <div style="position: relative; height: 400px; border: 1px solid blue; margin: 1em;">
        <vue-draggable-resizable :lock-aspect-ratio="lockAspectRatio" :parent="parent">
          <p>Combine aspect ratio and costrain in parent.</p>
        </vue-draggable-resizable>
      </div>
    `
  }),
  args: {
    lockAspectRatio: true,
    parent: true
  },
  parameters: {
    controls: { include: ['lockAspectRatio', 'parent'] }
  }
}

export default InParent
