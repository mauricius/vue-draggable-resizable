import VueDraggableResizable from '@/components/vue-draggable-resizable'
import { mount } from '@vue/test-utils'

let wrapper

describe('style props', function () {
  it('should provide the default class name as prop', function () {
    wrapper = mount(VueDraggableResizable, {
      propsData: {
        className: 'my-class'
      }
    })

    expect(wrapper.props().className).to.equal('my-class')
    expect(wrapper.classes()).to.contain('my-class')
  })

  it('should provide the active class name as prop', function () {
    wrapper = mount(VueDraggableResizable, {
      propsData: {
        classNameActive: 'my-active-class',
        active: true
      }
    })

    expect(wrapper.props().classNameActive).to.equal('my-active-class')
    expect(wrapper.classes()).to.contain('my-active-class')
  })

  it('should provide the dragging class name as prop', function () {
    wrapper = mount(VueDraggableResizable, {
      propsData: {
        classNameDragging: 'my-dragging-class'
      }
    })

    expect(wrapper.props().classNameDragging).to.equal('my-dragging-class')
  })

  it('should provide the resizing class name as prop', function () {
    wrapper = mount(VueDraggableResizable, {
      propsData: {
        classNameResizing: 'my-resizing-class'
      }
    })

    expect(wrapper.props().classNameResizing).to.equal('my-resizing-class')
  })

  it('should provide the handle class name as prop', function () {
    wrapper = mount(VueDraggableResizable, {
      propsData: {
        classNameHandle: 'my-handle-class'
      }
    })

    expect(wrapper.props().classNameHandle).to.equal('my-handle-class')
    expect(wrapper.findAll('div.my-handle-class').length).to.equal(8)
  })

  it('should provide handles for the component using named slots', function () {
    wrapper = mount(VueDraggableResizable, {
      slots: {
        tl: '<span>TL</span>',
        tm: '<span>TM</span>',
        tr: '<span>TR</span>',
        mr: '<span>MR</span>',
        br: '<span>BR</span>',
        bm: '<span>BM</span>',
        bl: '<span>BL</span>',
        ml: '<span>ML</span>'
      }
    })

    expect(wrapper.find('div.handle-tl').html()).to.contain('<span>TL</span>')
    expect(wrapper.find('div.handle-tm').html()).to.contain('<span>TM</span>')
    expect(wrapper.find('div.handle-tr').html()).to.contain('<span>TR</span>')
    expect(wrapper.find('div.handle-mr').html()).to.contain('<span>MR</span>')
    expect(wrapper.find('div.handle-br').html()).to.contain('<span>BR</span>')
    expect(wrapper.find('div.handle-bm').html()).to.contain('<span>BM</span>')
    expect(wrapper.find('div.handle-bl').html()).to.contain('<span>BL</span>')
    expect(wrapper.find('div.handle-ml').html()).to.contain('<span>ML</span>')
  })

  afterEach(() => wrapper.destroy())
})
