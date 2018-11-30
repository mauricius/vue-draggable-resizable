import Vue from 'vue'

const style = {
  border: 'dashed 1px black'
};

export default () => ({
  template: `
    <vue-draggable-resizable v-bind:style='${JSON.stringify(style)}'>
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
})
