import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'

describe('size props', () => {

  it('should set the initial size of the component using `w` and `h` props', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        w: 200,
        h: 150
      }
    })

    cy.get('div.vdr')
      .should('have.css', 'width', '200px')
      .should('have.css', 'height', '150px')

    cy.get('@vue').should(wrapper => {
      expect(wrapper.vm.$el.style.width).to.equal('200px')
      expect(wrapper.vm.$el.style.height).to.equal('150px')
    })
  })

  it('should react to size prop changes', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        w: 200,
        h: 150
      }
    })

    cy.get('@vue').then(wrapper => {
      wrapper.setProps({ w: 250, h: 200 })

      cy.get('div.vdr')
        .should('have.css', 'width', '250px')
        .should('have.css', 'height', '200px')
    })
  })

  it('should allow auto value for `w` and `h` props', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        w: 'auto',
        h: 'auto'
      },
      slots: {
        default: '<div style="width: 100px; height: 100px"></div>'
      }
    })

    cy.get('div.vdr')
      // Cypress tests computed styles (100px for the content, 1px for the border)
      .should('have.css', 'width', '102px')
      .should('have.css', 'height', '102px')

    cy.get('@vue').should(wrapper => {
      expect(wrapper.props().w).to.equal('auto')
      expect(wrapper.props().h).to.equal('auto')
    })
  })
})
