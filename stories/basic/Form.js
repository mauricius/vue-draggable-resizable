import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'

const Form = {
  render: ({}) => ({
    components: { VueDraggableResizable },
    template: `
      <vue-draggable-resizable>
        <p>Basic component with form inside.</p>
        <form @submit.stop.prevent="onSubmit">
          <input type="text" name="input" />
          <button type="submit">Submit</button>
        </form>
      </vue-draggable-resizable>
    `,
    methods: {
      onSubmit(e) {
        alert("You just submitted the form!")
      }
    }
  }),
  parameters: {
    controls: { include: [] }
  }
}

export default Form
