import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'

describe('"active" prop', () => {

  it('should not have the "active" class if the component is not active', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        active: false
      }
    })

    cy.get('div.vdr')
      .should('not.have.class', 'active')
  })

  it('should enable the component through "active" prop', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        active: true
      }
    })

    cy.get('div.vdr')
      .should('have.class', 'active')

    cy.get('@vue').should(wrapper => {
      expect(wrapper.props().active).to.be.true
    })
  })

  it('should not show handles if the component is not active', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        active: false
      }
    })

    cy.get('div.handle')
      .should('be.not.visible')
  })

  it('should show handles if the component is active', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        active: true
      }
    })

    cy.get('div.handle')
      .should('be.visible')
  })

  it('should watch to the "active" prop', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        active: false
      }
    })

    cy.get('@vue').then(wrapper => {
      wrapper.setProps({ active: true })

      cy.get('div.vdr')
        .should('have.class', 'active')
    })
  })

  it('should activate the component when clicking on it', () => {
    const onActivated = cy.spy().as('onActivatedSpy')

    cy.mount(VueDraggableResizable, {
      propsData: {
        onActivated
      }
    })

    cy.get('div.vdr').click()

    cy.get('@onActivatedSpy')
      .should('have.been.calledOnce')

    cy.get('@vue').should(wrapper => {
      expect(wrapper.emitted()).to.have.property('update:active')
    })
  })

  it('should emit "activated" event if the component is mounted with the "active" prop set true', () => {
    const onActivated = cy.spy().as('onActivatedSpy')

    cy.mount(VueDraggableResizable, {
      propsData: {
        active: true,
        onActivated
      }
    })

    cy.get('@onActivatedSpy')
      .should('have.been.called')
  })

  it('should deactivate the component when clicking outside it', () => {
    const onDeactivated = cy.spy().as('onDeactivatedSpy')

    cy.mount(VueDraggableResizable, {
      propsData: {
        active: true,
        onDeactivated
      }
    })

    cy.get(document.documentElement).click()

    cy.get('@onDeactivatedSpy')
      .should('have.been.calledOnce')

    cy.get('div.vdr')
      .should('not.have.class', 'active')

    cy.get('@vue').should(wrapper => {
      expect(wrapper.emitted()).to.have.property('update:active')
    })
  })

  it('should not activate the component when right-clicking on it', () => {
    const onActivated = cy.spy().as('onActivatedSpy')

    cy.mount(VueDraggableResizable, {
      propsData: {
        active: false,
        onActivated
      }
    })

    cy.get('div.vdr').rightclick()

    cy.get('@onActivatedSpy')
      .should('not.have.been.called')

    cy.get('div.vdr')
      .should('not.have.class', 'active')

    cy.get('@vue').should(wrapper => {
      expect(wrapper.emitted()).to.not.have.property('update:active')
    })
  })

  it('should resize the component also when it is activated using prop', () => {
    const onResizing = cy.spy().as('onResizingSpy')

    cy.mount(VueDraggableResizable, {
      propsData: {
        w: 100,
        h: 100,
        active: false,
        onResizing
      }
    })

    cy.get('@vue')
      .then(wrapper => {
        wrapper.setProps({ active: true })
      })
      .then(() => {
        cy.get('div.handle-br').move({ deltaX: 100, deltaY: 100 })

        cy.get('@onResizingSpy')
          .should('have.been.called.with', 0, 0, 200, 200)
      })
  })

  it('should activate the component when touching on it', () => {
    const onActivated = cy.spy().as('onActivatedSpy')

    cy.mount(VueDraggableResizable, {
      propsData: {
        onActivated
      }
    })

    cy.get('div.vdr').trigger('touchstart')

    cy.get('@onActivatedSpy')
      .should('have.been.calledOnce')

    cy.get('@vue').should(wrapper => {
      expect(wrapper.emitted()).to.have.property('update:active')
    })
  })
})

