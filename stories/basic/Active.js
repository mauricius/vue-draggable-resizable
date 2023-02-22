import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'

const Active = {
  render: ({ active }) => ({
    components: { VueDraggableResizable },
    setup() {
      return { active };
    },
    template: `
      <vue-draggable-resizable :active="active">
        <p>Controlling the active state from outside the component by providing the <b>active</b> prop.</p>
      </vue-draggable-resizable>
    `
  }),
  args: {
    active: false
  },
  parameters: {
    controls: {
      include: ['active']
    }
  }
}

export default Active
