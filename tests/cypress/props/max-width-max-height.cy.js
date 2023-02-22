import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'

describe('`max-width` and `max-height` props', () => {

  it('should pass `max-width` and `max-height` as props', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        maxWidth: 200,
        maxHeight: 300
      }
    })

    cy.get('@vue').should(wrapper => {
      expect(wrapper.props().maxWidth).to.equal(200)
      expect(wrapper.props().maxHeight).to.equal(300)
    })
  })

  it('should react to `max-width` and `max-height` prop changes', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        maxWidth: 200,
        maxHeight: 300
      }
    })

    cy.get('@vue')
      .then(wrapper => wrapper.setProps({ maxWidth: 300, maxHeight: 200 }))
      .then(wrapper => {
        expect(wrapper.props().maxWidth).to.equal(300)
        expect(wrapper.props().maxHeight).to.equal(200)
      })
  })

  it('should not resize the component over `max-width` and `max-height` props', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        maxWidth: 100,
        maxHeight: 100,
        w: 100,
        h: 100,
        active: true
      }
    })

    cy.get('div.handle-br').move({ deltaX: 50, deltaY: 50 })

    cy.get('div.vdr')
      .should('have.css', 'width', '100px')
      .should('have.css', 'height', '100px')
  })
})
