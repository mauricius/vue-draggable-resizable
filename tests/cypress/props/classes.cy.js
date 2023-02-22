import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'

describe('classes props', () => {

  it('should provide the default class name as `class-name` prop', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        className: 'my-class'
      }
    })

    cy.get('div.my-class').should('have.class', 'my-class')

    cy.get('@vue').should(wrapper => {
      expect(wrapper.props().className).to.equal('my-class')
    })
  })

  it('should provide the active class name as `class-name-active` prop', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        classNameActive: 'my-active-class',
        active: true
      }
    })

    cy.get('div.vdr').should('have.class', 'my-active-class')

    cy.get('@vue').should(wrapper => {
      expect(wrapper.classes()).to.contain('my-active-class')
    })
  })

  it('should provide the dragging class name as `class-name-dragging` prop', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        classNameDragging: 'my-dragging-class'
      }
    })

    cy.get('@vue').should(wrapper => {
      expect(wrapper.props().classNameDragging).to.equal('my-dragging-class')
    })
  })

  it('should provide the resizing class name as `class-name-resizing` prop', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        classNameResizing: 'my-resizing-class'
      }
    })

    cy.get('@vue').should(wrapper => {
      expect(wrapper.props().classNameResizing).to.equal('my-resizing-class')
    })
  })

  it('should provide the handle class name as `class-name-handle` prop', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        classNameHandle: 'my-handle-class'
      }
    })

    cy.get('div.my-handle-class').should('have.length', 8)

    cy.get('@vue').should(wrapper => {
      expect(wrapper.props().classNameHandle).to.equal('my-handle-class')
    })
  })
})
