import Vue from 'vue'
import VueDraggableResizable from '@/components/vue-draggable-resizable'
import { mount } from '@vue/test-utils'
import syn from 'syn'

let wrapper

describe('style props', function () {
  it('should provide the className as prop', function () {
    wrapper = mount(VueDraggableResizable, {
      propsData: {
        className: 'my-class'
      }
    })

    expect(wrapper.props().className).to.equal('my-class')
    expect(wrapper.classes()).to.contain('my-class')
  })

  it('should provide the classNameActive as prop', function () {
    wrapper = mount(VueDraggableResizable, {
      propsData: {
        classNameActive: 'my-active-class',
        active: true
      }
    })

    expect(wrapper.props().classNameActive).to.equal('my-active-class')
    expect(wrapper.classes()).to.contain('my-active-class')
  })

  it('should provide the classNameDragging as prop', function () {
    wrapper = mount(VueDraggableResizable, {
      propsData: {
        classNameDragging: 'my-dragging-class'
      }
    })

    expect(wrapper.props().classNameDragging).to.equal('my-dragging-class')
  })

  it('should provide the classNameResizing as prop', function () {
    wrapper = mount(VueDraggableResizable, {
      propsData: {
        classNameResizing: 'my-resizing-class'
      }
    })

    expect(wrapper.props().classNameResizing).to.equal('my-resizing-class')
  })

  it('should provide the classNameHandle as prop', function () {
    wrapper = mount(VueDraggableResizable, {
      propsData: {
        classNameHandle: 'my-handle-class'
      }
    })

    expect(wrapper.props().classNameHandle).to.equal('my-handle-class')
    expect(wrapper.findAll('div.my-handle-class').length).to.equal(8)
  })

  it('should provide a component for handles using named slots', function () {
    wrapper = mount(VueDraggableResizable, {
      slots: {
        tl: '<span>TL</span>'
      }
    })

    expect(wrapper.find('div.handle-tl').html()).to.contain('<span>TL</span>')
  })

  afterEach(() => wrapper.destroy())
})
