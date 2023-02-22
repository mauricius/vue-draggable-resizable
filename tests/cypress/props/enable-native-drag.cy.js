import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'

describe('native dragging', () => {

  it('should enable native drag by setting the `enable-native-drag` prop', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        enableNativeDrag: true
      }
    })

    cy.get('@vue').should(wrapper => {
      expect(wrapper.props().enableNativeDrag).to.be.true
    })
  })
})
