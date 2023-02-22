import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'
import translateToMatrix from '../utils'

describe('`onDragStart` and `onResizeStart` props', () => {

  it('should call `onDragStart` callback when the component is clicked', () => {
    const onDragStartSpy = cy.spy().as('onDragStartSpy')

    cy.mount(VueDraggableResizable, {
      propsData: {
        onDragStart: onDragStartSpy
      }
    })

    cy.get('div.vdr').click()

    cy.get('@onDragStartSpy').should('have.been.calledOnce')
  })

  it('should prevent activation of the component if the `onDragStart` callback returns false', () => {
    const onDragStart = () => false
    const onActivatedSpy = cy.spy().as('onActivatedSpy')

    cy.mount(VueDraggableResizable, {
      propsData: {
        onDragStart,
        onActivated: onActivatedSpy
      }
    })

    cy.get('div.vdr')
      .click()
      .should('not.have.class', 'active')

    cy.get('@onActivatedSpy').should('not.have.been.called')
  })

  it('should call `onResizeStart` callback when the component is resized', () => {
    const onResizeStartSpy = cy.spy().as('onResizeStartSpy')

    cy.mount(VueDraggableResizable, {
      propsData: {
        active: true,
        onResizeStart: onResizeStartSpy
      }
    })

    cy.get('div.handle-br').move({ deltaX: 100, deltaY: 100 })

    cy.get('@onResizeStartSpy').should('have.been.called')
  })

  it('should prevent resizing the component if the `onResizeStart` callback returns false', () => {
    const onResizeStart = () => false

    cy.mount(VueDraggableResizable, {
      propsData: {
        active: true,
        w: 100,
        h: 100,
        onResizeStart: onResizeStart
      }
    })

    cy.get('div.handle-br').move({ deltaX: 100, deltaY: 100 })

    cy.get('div.vdr')
      .should('have.css', 'width', '100px')
      .should('have.css', 'height', '100px')
  })
})


describe('`onDrag` and `onResize` props', () => {

  it('should call `onDrag` callback when the component is dragged', () => {
    const onDragSpy = cy.spy().as('onDragSpy')

    cy.mount(VueDraggableResizable, {
      propsData: {
        active: true,
        w: 100,
        h: 100,
        onDrag: onDragSpy
      }
    })

    cy.get('div.vdr').move({ deltaX: 100, deltaY: 100 })

    cy.get('@onDragSpy').should('have.been.calledWith', 100, 100)
  })

  it('should prevent dragging the component if the `onDrag` callback returns false', () => {
    const onDragCallback = (x, y) => {
      if (x > 10) return false
      if (y > 10) return false
    }

    cy.mount(VueDraggableResizable, {
      propsData: {
        active: true,
        w: 100,
        h: 100,
        onDrag: onDragCallback
      }
    })

    cy.get('div.vdr')
      // intermediate step
      .move({ deltaX: 10, deltaY: 10 })
      .should('have.css', 'transform', translateToMatrix('10', '10'))
      .should('have.css', 'width', '100px')
      .should('have.css', 'height', '100px')
      // final step
      .move({ deltaX: 100, deltaY: 100 })
      .should('have.css', 'transform', translateToMatrix('10', '10'))
  })

  it('should call `onResize` callback when the component is resized', () => {
    const onResizeSpy = cy.spy().as('onResizeSpy')

    cy.mount(VueDraggableResizable, {
      propsData: {
        active: true,
        w: 100,
        h: 100,
        onResize: onResizeSpy
      }
    })

    cy.get('div.handle-br').move({ deltaX: 100, deltaY: 100 })

    cy.get('@onResizeSpy').should('have.been.calledWith', 'br', 0, 0, 200, 200)
  })

  it('should prevent resizing the component if the `onResize` callback returns false', () => {
    const onResizeCallback = (handle, x, y, w, h) => {
      if (w > 110) return false
      if (h > 110) return false
    }

    cy.mount(VueDraggableResizable, {
      propsData: {
        active: true,
        w: 100,
        h: 100,
        onResize: onResizeCallback
      }
    })

    cy.get('div.handle-br').move({ deltaX: 10, deltaY: 10 })

    cy.get('div.vdr')
      .should('have.css', 'width', '110px')
      .should('have.css', 'height', '110px')

    cy.get('div.handle-br').move({ deltaX: 100, deltaY: 100 })

    cy.get('div.vdr')
      .should('have.css', 'width', '110px')
      .should('have.css', 'height', '110px')
  })
})
