import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'

const baseStyle = {
  position: 'relative',
  backgroundColor: '#808080',
  background: 'linear-gradient(-90deg, rgba(0, 0, 0, .1) 1px, transparent 1px), linear-gradient(rgba(0, 0, 0, .1) 1px, transparent 1px)',
  backgroundSize: '20px 20px, 20px 20px',
  height: '100vh'
}

const WithGrid = {
  render: ({ lockAspectRatio, w, h, grid }) => ({
    components: { VueDraggableResizable },
    setup() {
      return {
        lockAspectRatio,
        w,
        h,
        grid
      };
    },
    template: `
      <div :style='${JSON.stringify(baseStyle)}'>
        <vue-draggable-resizable :w="400" :h="200" :lock-aspect-ratio="true" :grid=[20,20]>
          <p>Keep aspect ratio in component costrained on grid ${JSON.stringify(grid)}.</p>
        </vue-draggable-resizable>
      </div>
    `,
    computed: {
      style () {
        return {
          ...baseStyle,
          backgroundSize: `${grid[0]}px ${grid[1]}px ${grid[0]}px ${grid[1]}px`
        }
      }
    }
  }),
  args: {
    lockAspectRatio: true,
    w: 400,
    h: 200,
    grid: [20, 20]
  },
  parameters: {
    controls: { include: ['lockAspectRatio'] }
  }
}

export default WithGrid
