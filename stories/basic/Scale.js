import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'

const Scale = {
  render: ({ scale }) => ({
    components: { VueDraggableResizable },
    setup() {
      return { scale };
    },
    template: `
      <div v-bind:style="{ transform: 'scale(' + scale + ')' }">
        <vue-draggable-resizable :scale="scale">
          <p>Change the "scale" property to support CSS scale transform. Current value is {{ scale }}</p>
        </vue-draggable-resizable>
        <vue-draggable-resizable :x="250">
          <p>Component with default scale prop set to 1</p>
        </vue-draggable-resizable>
      </div>
    `
  }),
  args: {
    scale: 1
  },
  parameters: {
    controls: { include: ['scale'] },
  }
}

export default Scale
