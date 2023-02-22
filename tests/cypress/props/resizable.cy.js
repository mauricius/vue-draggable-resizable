import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'
import translateToMatrix from '../utils'

describe('component resizable', () => {

  it('should have `resizable` class by default', () => {
    cy.mount(VueDraggableResizable)

    cy.get('div.vdr').should('have.class', 'resizable')
  })

  it('should not have the `resizable` class if the `resizable` prop is false', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        resizable: false
      }
    })

    cy.get('div.vdr')
      .should('not.have.class', 'resizable')
      .should('have.class', 'draggable')

    cy.get('@vue').should(wrapper => {
      expect(wrapper.props().resizable).to.be.false
    })
  })

  it('should not render handles if the `resizable` prop is false', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        active: true,
        resizable: false
      }
    })

    cy.get('div.handle').should('have.length', 0)
  })


  it('should react to `resizable` prop changes', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        resizable: false
      }
    })

    cy.get('@vue').then(wrapper => {
      wrapper.setProps({ resizable: true })

      cy.get('div.vdr').should('have.class', 'resizable')
    })
  })
})
