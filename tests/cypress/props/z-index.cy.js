import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'

describe('z-index prop', () => {

  it('should set the z-index through the `z` prop', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        z: 99
      }
    })

    cy.get('div.vdr').should('have.css', 'z-index', '99')

    cy.get('@vue').should(wrapper => {
      expect(wrapper.props().z).to.equal(99)
    })
  })

  it('should set "auto" as defaul value for z-index if `z` prop is not provided', () => {
    cy.mount(VueDraggableResizable)

    cy.get('div.vdr').should('have.css', 'z-index', 'auto')
  })

  it('should react to `z` prop changes', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        z: 99
      }
    })

    cy.get('@vue')
      .then(wrapper => {
        wrapper.setProps({ z: 999 })
      })
      .then(wrapper => {
        cy.get('div.vdr').should('have.css', 'z-index', '999')
      })
  })
})
