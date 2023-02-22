import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'
import translateToMatrix from '../utils'

describe('`drag-handle` prop', () => {

  it('should activate the component from the selector identified by the `drag-handle` prop', () => {
    const onActivated = cy.spy().as('onActivatedSpy')

    cy.mount(VueDraggableResizable, {
      propsData: {
        dragHandle: '.drag-handle',
        onActivated
      },
      slots: {
        default: '<div class="drag-handle">Drag only me</div>'
      }
    })

    cy.get('.drag-handle').click()

    cy.get('@onActivatedSpy').should('have.been.called')

    cy.get('@vue').should(wrapper => {
      expect(wrapper.emitted()).to.have.property('update:active')
    })
  })

  it('should not activate the component from outside the selector identified by the `drag-handle` prop', () => {
    const onActivated = cy.spy().as('onActivatedSpy')

    cy.mount(VueDraggableResizable, {
      propsData: {
        dragHandle: '.drag-handle',
        onActivated
      },
      slots: {
        default: '<div class="drag-handle">Drag only me</div>'
      }
    })

    cy.get('div.vdr').click()

    cy.get('@onActivatedSpy').should('not.have.been.called')

    cy.get('@vue').should(wrapper => {
      expect(wrapper.emitted()).to.not.have.property('update:active')
    })
  })

  it('should drag the component only from the selector identified by the `drag-handle` prop', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        dragHandle: '.drag-handle',
        x: 0,
        y: 0,
        w: 100,
        h: 100
      },
      slots: {
        default: '<div class="drag-handle">Drag only me</div>'
      }
    })

    cy.get('.drag-handle').move({ deltaX: 100, deltaY: 100 })

    cy.get('div.vdr')
      .should('have.css', 'transform', translateToMatrix('100', '100'))
  })
})
