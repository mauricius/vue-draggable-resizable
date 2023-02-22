import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'

const Handles = {
  render: ({ handles }) => ({
    components: { VueDraggableResizable },
    setup() {
      return { handles };
    },
    data() {
      return {
        available: ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml']
      }
    },
    template: `
      <vue-draggable-resizable :handles="handles" :prevent-deactivation="true" :w="250" :h="250">
        <p>Enable/disable handles.</p>
        <ul>
          <li v-for="handle, i in available" :key="i">{{ handle }} - {{ handles[i] ? '&check;' : '&cross;' }}</li>
        </ul>
      </vue-draggable-resizable>
    `
  }),
  args: {
    handles: ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml']
  },
  parameters: {
    controls: {
      include: ['handles']
    }
  }
}

export default Handles
