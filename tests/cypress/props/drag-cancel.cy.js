import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'
import translateToMatrix from '../utils'

describe('`drag-cancel` prop', () => {

  it('should not activate the component from the selector identified by the `drag-cancel` prop', () => {
    const onActivated = cy.spy().as('onActivatedSpy')

    cy.mount(VueDraggableResizable, {
      propsData: {
        dragCancel: '.drag-cancel',
        onActivated
      },
      slots: {
        default: '<div class="drag-cancel">Drag is not allowed here</div>'
      }
    })

    cy.get('.drag-cancel').click()

    cy.get('@onActivatedSpy').should('not.have.been.called')

    cy.get('@vue').should(wrapper => {
      expect(wrapper.emitted()).to.not.have.property('update:active')
    })
  })

  it('should activate the component from outside the selector identified by the `drag-cancel` prop', () => {
    const onActivated = cy.spy().as('onActivatedSpy')

    cy.mount(VueDraggableResizable, {
      propsData: {
        dragCancel: '.drag-cancel',
        onActivated
      },
      slots: {
        default: '<div class="drag-cancel">Drag is not allowed here</div>'
      }
    })

    cy.get('div.vdr').click()

    cy.get('@onActivatedSpy').should('have.been.called')

    cy.get('@vue').should(wrapper => {
      expect(wrapper.emitted()).to.have.property('update:active')
    })
  })
})
