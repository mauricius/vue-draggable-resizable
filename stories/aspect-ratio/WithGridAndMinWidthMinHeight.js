import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'

const withGridAndMinWidthMinHeightStyle = {
  position: 'relative',
  backgroundColor: '#808080',
  background: 'linear-gradient(-90deg, rgba(0, 0, 0, .1) 1px, transparent 1px), linear-gradient(rgba(0, 0, 0, .1) 1px, transparent 1px)',
  backgroundSize: '20px 40px, 20px 40px',
  backgroundPosition: '10px 20px',
  height: '100vh'
}

const WithGridAndMinWidthMinHeight = {
  render: ({ grid, x, y, minHeight, minWidth, lockAspectRatio }) => ({
    components: { VueDraggableResizable },
    setup() {
      return {
        grid,
        x,
        y,
        minHeight,
        minWidth,
        lockAspectRatio,
      };
    },
    template: `
      <div :style='${JSON.stringify(withGridAndMinWidthMinHeightStyle)}'>
        <vue-draggable-resizable :grid="grid" :x="x" :y="y" :minh="minHeight" :minw="minWidth" :lock-aspect-ratio="lockAspectRatio">
          <p>Aspect ratio in Grid 20x40 starting with a 10x20 offset</p>
        </vue-draggable-resizable>
      </div>
    `
  }),
  args: {
    grid: [20, 40],
    x: 10,
    y: 20,
    minHeight: 30,
    minWidth: 30,
    lockAspectRatio: true,
  },
  parameters: {
    controls: { include: ['lockAspectRatio'] }
  }
}

export default WithGridAndMinWidthMinHeight
