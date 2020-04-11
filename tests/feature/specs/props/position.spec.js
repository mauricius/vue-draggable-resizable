import VueDraggableResizable from '@/components/vue-draggable-resizable'
import { mount } from '@vue/test-utils'

let wrapper

describe('position props', function () {
  it('should set the initial position of the element using `x` and `y` props', function () {
    wrapper = mount(VueDraggableResizable, {
      propsData: {
        x: 200,
        y: 150
      }
    })

    expect(wrapper.props().x).to.equal(200)
    expect(wrapper.props().y).to.equal(150)

    expect(wrapper.vm.$el.style.transform).to.equal('translate(200px, 150px)')
  })

  it('should react to position prop changes', function () {
    wrapper = mount(VueDraggableResizable, {
      propsData: {
        x: 200,
        y: 150
      }
    })

    wrapper.setProps({ x: 250, y: 200 })

    expect(wrapper.vm.$el.style.transform).to.equal('translate(250px, 200px)')
  })

  afterEach(() => wrapper.destroy())
})
