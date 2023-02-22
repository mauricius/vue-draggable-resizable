import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'

describe('axis prop', () => {
  it('should provide the draggable `axis` prop to the component', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        axis: 'x'
      }
    })

    cy.get('@vue').should(wrapper => {
      expect(wrapper.props().axis).to.equal('x')
    })
  })

  it('should drag the component only on the horizontal axis', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        axis: 'x',
        x: 0,
        y: 0,
        w: 100,
        h: 100
      }
    })

    cy.get('div.vdr')
      .trigger('mousedown', { button: 0 })
      .trigger('mousemove', {
        pageX: 100,
        pageY: 100
      })
      .trigger('mouseup')

    cy.get('@vue').should(wrapper => {
      const $el = wrapper.vm.$el

      expect($el.style.transform).to.be.oneOf([
        'translate(42px, 0px)', // Chrome
        'translate(42px)',      // Firefox
      ])
    })
  })

  it('should effectively drag the component only on the vertical axis', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        axis: 'y',
        x: 0,
        y: 0,
        w: 100,
        h: 100
      }
    })

    cy.get('div.vdr')
      .trigger('mousedown', { button: 0 })
      .trigger('mousemove', {
        pageX: 100,
        pageY: 100
      })
      .trigger('mouseup')

    cy.get('@vue').should(wrapper => {
      const $el = wrapper.vm.$el

      expect($el.style.transform).to.equal('translate(0px, 42px)')
    })
  })
})
