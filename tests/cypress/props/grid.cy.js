import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'
import translateToMatrix from '../utils'

describe('`grid` prop', () => {

  it('should provide the `grid` as prop', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        grid: [20, 40]
      }
    })

    cy.get('@vue').should(wrapper => {
      expect(wrapper.props().grid[0]).to.equal(20)
      expect(wrapper.props().grid[1]).to.equal(40)
    })
  })

  it('should react to the changes of the `grid` prop', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        grid: [20, 40]
      }
    })

    cy.get('@vue')
      .then(wrapper => wrapper.setProps({ grid: [10, 30] }))
      .then(wrapper => {
        expect(wrapper.props().grid[0]).to.equal(10)
        expect(wrapper.props().grid[1]).to.equal(30)
      })
  })

  it('should not drag the component on the grid if the drag movement is smaller than the grid interval', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        x: 0,
        y: 0,
        w: 100,
        h: 100,
        grid: [20, 40]
      }
    })

    cy.get('div.vdr')
      .move({ deltaX: 9, deltaY: 19 })
      .should('have.css', 'transform', translateToMatrix(0, 0))
  })

  it('should drag the component on the grid if the drag movement equals the grid interval', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        x: 0,
        y: 0,
        w: 100,
        h: 100,
        grid: [20, 40]
      }
    })

    cy.get('div.vdr')
      .move({ deltaX: 29, deltaY: 59 })
      .should('have.css', 'transform', translateToMatrix(20, 40))
  })

  it('should not resize the component on the grid if the drag movement is smaller than the grid interval', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        x: 0,
        y: 0,
        w: 100,
        h: 100,
        grid: [20, 40],
        active: true
      }
    })

    cy.get('div.handle-br')
      .move({ deltaX: 9, deltaY: 19 })

    cy.get('div.vdr')
      .should('have.css', 'transform', translateToMatrix(0, 0))
      .should('have.css', 'width', '100px')
      .should('have.css', 'height', '100px')
  })

  it('should resize the component on the grid if the resize movement equals the grid interval', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        x: 0,
        y: 0,
        w: 100,
        h: 100,
        grid: [20, 40],
        active: true
      }
    })

    cy.get('div.handle-br')
      .move({ deltaX: 20, deltaY: 40 })

    cy.get('div.vdr')
      .should('have.css', 'transform', translateToMatrix(0, 0))
      .should('have.css', 'width', '120px')
      .should('have.css', 'height', '140px')
  })

  it('should not resize the component under lower grid values even if `minHeight` and `minWidth` props are lower', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        x: 0,
        y: 0,
        w: 100,
        h: 120,
        minHeight: 30,
        minWidth: 30,
        grid: [20, 40],
        active: true
      }
    })

    cy.get('div.handle-br')
      .move({ deltaX: -80, deltaY: -80 })

    cy.get('div.vdr')
      .should('have.css', 'transform', translateToMatrix(0, 0))
      .should('have.css', 'width', '40px')
      .should('have.css', 'height', '40px')
  })
})
