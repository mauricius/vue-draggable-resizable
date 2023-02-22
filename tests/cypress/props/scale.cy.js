import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'
import translateToMatrix from '../utils'

describe('`scale` prop', () => {

  it('should drag the component accordingly to the `scale` prop', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        w: 200,
        h: 200,
        scale: 0.5,
        active: true
      }
    })

    cy.get('div.vdr')
      .move({ deltaX: 50, deltaY: 50 })

    cy.get('div.vdr')
      .should('have.css', 'transform', translateToMatrix(100, 100))
  })

  it('should resize the component accordingly to the `scale` prop', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        w: 200,
        h: 200,
        scale: 1.5,
        active: true
      }
    })

    cy.get('div.handle-br')
      .move({ deltaX: 50, deltaY: 50 })

    cy.get('div.vdr')
      .should('have.css', 'width', '233px')
      .should('have.css', 'height', '233px')
  })
})
