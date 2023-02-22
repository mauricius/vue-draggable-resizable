import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'
import translateToMatrix from '../utils'

describe('component draggable', () => {

  it('should have the `draggable` class by default', () => {
    cy.mount(VueDraggableResizable)

    cy.get('div.vdr').should('have.class', 'draggable')
  })

  it('should not have the `draggable` class if the `draggable` prop is false', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        draggable: false
      }
    })

    cy.get('div.vdr')
      .should('not.have.class', 'draggable')
      .should('have.class', 'resizable')

    cy.get('@vue').should(wrapper => {
      expect(wrapper.props().draggable).to.be.false
    })
  })

  it('should react to `draggable` prop changes', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        draggable: false
      }
    })

    cy.get('@vue').then(wrapper => {
      wrapper.setProps({ draggable: true })

      cy.get('div.vdr').should('have.class', 'draggable')
    })
  })

  it('should not be draggable if `draggable` prop is false', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        x: 0,
        y: 0,
        w: 100,
        h: 100,
        draggable: false
      }
    })

    cy.get('div.vdr')
      .move({ deltaX: 100, deltaY: 100 })
      .should('have.css', 'transform', translateToMatrix(0, 0))
      .should('have.css', 'width', '100px')
      .should('have.css', 'height', '100px')
  })
})
