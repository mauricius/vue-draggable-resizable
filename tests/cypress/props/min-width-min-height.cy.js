import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'

describe('`min-height` and `min-width` props', () => {

  it('should pass `min-height` and `min-width` as props', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        minHeight: 100,
        minWidth: 200
      }
    })

    cy.get('@vue').should(wrapper => {
      expect(wrapper.props().minHeight).to.equal(100)
      expect(wrapper.props().minWidth).to.equal(200)
    })
  })

  it('should react to `min-height` and `min-width` prop changes', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        minHeight: 100,
        minWidth: 200
      }
    })

    cy.get('@vue').then(wrapper => wrapper.setProps({ minHeight: 200, minWidth: 300 }))
    .then(wrapper => {
      expect(wrapper.props().minHeight).to.equal(200)
      expect(wrapper.props().minWidth).to.equal(300)
    })
  })

  it('should not resize the component under `min-height` and `min-width`', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        minHeight: 100,
        minWidth: 100,
        w: 100,
        h: 100,
        active: true
      }
    })

    cy.get('div.handle-br').move({ deltaX: -50, deltaY: -50 })

    cy.get('div.vdr')
      .should('have.css', 'width', '100px')
      .should('have.css', 'height', '100px')
  })
})
