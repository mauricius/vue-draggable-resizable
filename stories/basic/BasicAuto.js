import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'

const BasicAuto = {
  render: ({}) => ({
    components: { VueDraggableResizable },
    template: `
      <div>
        <vue-draggable-resizable :w="width" :h="height" @resizing="onResize">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate aperiam explicabo animi expedita unde perspiciatis quae, consequatur consequuntur libero assumenda, accusantium repellat illo asperiores molestiae ea quasi distinctio, aspernatur saepe!</p>
        </vue-draggable-resizable>
        <div id="toolbar">
          Size: {{ width }} x {{ height }}
        </div>
      </div>
    `,
    data() {
      return {
        width: 'auto',
        height: 'auto'
      }
    },
    methods: {
      onResize(_left, _top, width, height) {
        this.width = width
        this.height = height
      }
    }
  }),
  parameters: {
    controls: { include: [] }
  }
}

export default BasicAuto
