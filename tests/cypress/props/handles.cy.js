import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'
import translateToMatrix from '../utils'

describe('`handles` prop', () => {

  it('should render only the handles passed with `handles` props', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        handles: ['tl', 'tm', 'tr', 'bl', 'bm', 'br']
      }
    })

    cy.get('div.handle').should('have.length', 6)

    cy.get('@vue').should(wrapper => {
      expect(wrapper.props().handles).to.have.length(6)
    })
  })

  it('should not render the handles if `handles` props is empty', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        handles: []
      }
    })

    cy.get('div.handle').should('have.length', 0)
  })

  it('should react to `handles` prop changes', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        handles: []
      }
    })

    cy.get('@vue')
      .then(wrapper => wrapper.setProps({ handles: ['tl', 'tm', 'tr', 'bl', 'bm', 'br'] }))
      .then(wrapper => {
        expect(wrapper.props().handles).to.have.length(6)

        cy.get('div.handle').should('have.length', 6)
      })
  })
})
