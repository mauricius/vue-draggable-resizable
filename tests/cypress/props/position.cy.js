import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'
import translateToMatrix from '../utils'

describe('position props', () => {

  it('should set the initial position of the element using `x` and `y` props', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        x: 200,
        y: 150
      }
    })

    cy.get('@vue').should(wrapper => {
      expect(wrapper.props().x).to.equal(200)
      expect(wrapper.props().y).to.equal(150)
    })

    cy.get('div.vdr')
      .should('have.css', 'transform', translateToMatrix(200, 150))
  })

  it('should react to position prop changes', async function () {
    cy.mount(VueDraggableResizable, {
      propsData: {
        x: 200,
        y: 150
      }
    })

    cy.get('@vue').should(wrapper => {
      wrapper.setProps({ x: 250, y: 200 })
    })

    cy.get('div.vdr')
      .should('have.css', 'transform', translateToMatrix(250, 200))
  })
})
