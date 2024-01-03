import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'

describe('VueDraggableResizable events', () => {

  it('should emit "activated" event when the component is clicked', () => {
    const onActivated = cy.spy().as('onActivatedSpy')

    cy.mount(VueDraggableResizable, {
      propsData: {
        active: false,
        onActivated
      }
    })

    cy.get('div.vdr').click()

    cy.get('@onActivatedSpy')
      .should('have.been.called')
  })

  it('should emit "dragging" event while dragging the component', () => {
    const onDragging = cy.spy().as('onDraggingSpy')

    cy.mount(VueDraggableResizable, {
      propsData: {
        w: 100,
        h: 100,
        active: true,
        onDragging
      }
    })

    cy.get('div.vdr')
      .move({ deltaX: 50, deltaY: 50 })

    cy.get('@onDraggingSpy')
      .should('have.been.calledWith', 50, 50)
  })

  it('should emit "dragStop" event while stopping dragging the component', () => {
    const onDragStop = cy.spy().as('onDragStopSpy')

    cy.mount(VueDraggableResizable, {
      propsData: {
        w: 100,
        h: 100,
        active: true,
        onDragStop
      }
    })

    cy.get('div.vdr')
      .move({ deltaX: 50, deltaY: 50 })

    cy.get('@onDragStopSpy')
      .should('have.been.calledWith', 50, 50)
  })

  it('should not emit "dragStop" when the component is activated', () => {
    const onDragStop = cy.spy().as('onDragStopSpy')

    cy.mount(VueDraggableResizable, {
      propsData: {
        w: 100,
        h: 100,
        onDragStop
      }
    })

    cy.get('div.vdr').click()

    cy.get('@onDragStopSpy')
      .should('not.have.been.called')
  })

  it('should emit "resizing" event while resizing the component', () => {
    const onResizing = cy.spy().as('onResizingSpy')

    cy.mount(VueDraggableResizable, {
      propsData: {
        w: 100,
        h: 100,
        active: true,
        onResizing
      }
    })

    cy.get('div.handle-br')
      .move({ deltaX: 50, deltaY: 50 })

    cy.get('@onResizingSpy')
      .should('have.been.calledWith', 0, 0, 150, 150)
  })

  it('should emit "resizeStop" event while stopping resizing the component', () => {
    const onResizeStop = cy.spy().as('onResizeStopSpy')

    cy.mount(VueDraggableResizable, {
      propsData: {
        w: 100,
        h: 100,
        active: true,
        onResizeStop
      }
    })

    cy.get('div.handle-br')
      .move({ deltaX: 50, deltaY: 50 })

    cy.get('@onResizeStopSpy')
      .should('have.been.calledWith', 0, 0, 150, 150)
  })

  it('should not emit "resizeStop" when a handle is clicked', () => {
    const onResizeStop = cy.spy().as('onResizeStopSpy')

    cy.mount(VueDraggableResizable, {
      propsData: {
        w: 100,
        h: 100,
        active: true,
        onResizeStop
      }
    })

    cy.get('div.handle-br').click()

    cy.get('@onResizeStopSpy')
      .should('not.have.been.called')
  })
})
