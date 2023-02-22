import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'

const withGridInParentStyle = {
  position: 'relative',
  backgroundColor: '#808080',
  background: 'linear-gradient(-90deg, rgba(0, 0, 0, .1) 1px, transparent 1px), linear-gradient(rgba(0, 0, 0, .1) 1px, transparent 1px)',
  backgroundSize: '20px 20px, 20px 20px',
  height: '400px',
  width: '400px',
  border: '1px solid blue',
  margin: '20px',
  boxSizing: 'border-box'
}

const WithGridInParent = {
  render: ({ lockAspectRatio, parent, grid }) => ({
    components: { VueDraggableResizable },
    setup() {
      return {
        lockAspectRatio,
        parent,
        grid
      };
    },
    template: `
      <div v-bind:style='${JSON.stringify(withGridInParentStyle)}'>
        <vue-draggable-resizable :grid="grid" :parent="parent" :lock-aspect-ratio="lockAspectRatio">
          <p>Keep aspect ratio, grid and parent costrained.</p>
        </vue-draggable-resizable>
      </div>
    `
  }),
  args: {
    lockAspectRatio: true,
    parent: true,
    grid: [20, 20]
  },
  parameters: {
    controls: { include: ['lockAspectRatio', 'parent'] }
  }
}

export default WithGridInParent
