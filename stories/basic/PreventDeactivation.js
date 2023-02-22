import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'

const PreventDeactivation = {
  render: ({ preventDeactivation }) => ({
    components: { VueDraggableResizable },
    setup() {
      return { preventDeactivation };
    },
    template: `
      <vue-draggable-resizable :prevent-deactivation="true">
        <p>Prevents the deactivation of the component by providing the <b>prevent-deactivation</b> prop.</p>
      </vue-draggable-resizable>
    `
  }),
  args: {
    preventDeactivation: true
  },
  parameters: {
    controls: {
      include: ['preventDeactivation']
    }
  }
}

export default PreventDeactivation
