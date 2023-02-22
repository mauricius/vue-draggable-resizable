import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'

describe('"prevent-deactivation" prop', () => {

  it('should not deactivate the component when clicking outside it if "prevent-deactivation" is set true', () => {
    const onDeactivated = cy.spy().as('onDeactivatedSpy')

    cy.mount(VueDraggableResizable, {
      propsData: {
        active: true,
        preventDeactivation: true,
        onDeactivated
      }
    })

    cy.get(document.documentElement).click()

    cy.get('@onDeactivatedSpy').should('not.have.been.called')

    cy.get('div.vdr').should('have.class', 'active')
  })

  it('should deactivate the component when clicking outside it if "prevent-deactivation" is set false', () => {
    const onDeactivated = cy.spy().as('onDeactivatedSpy')

    cy.mount(VueDraggableResizable, {
      propsData: {
        active: true,
        preventDeactivation: false,
        onDeactivated
      }
    })

    cy.get(document.documentElement).click()

    cy.get('@onDeactivatedSpy').should('have.been.called')

    cy.get('div.vdr').should('not.have.class', 'active')
  })
})
