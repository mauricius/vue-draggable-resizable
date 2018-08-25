# Activated and deactivated events

The `activated()` event is emitted when the component gets activated. The `deactivated()` event is emitted when the component gets deactivated.

~~~js
<vue-draggable-resizable :w="200" :h="200" @activated="onActivated" @deactivated="onDeactivated">
  <p v-if="active">The component has been activated.</p>
</vue-draggable-resizable>

export default () => ({
  [...]

  methods: {
    onActivated () {
      this.active = true
    },
    onDeactivated () {
      this.active = false
    }
  }
})
~~~

