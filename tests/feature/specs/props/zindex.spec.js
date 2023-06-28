import VueDraggableResizable from '@/components/vue-draggable-resizable'
import { mount } from '@vue/test-utils'
import div from '../../div'

let wrapper

describe('zIndex prop', function () {
  it('should set the zIndex through the `z` prop', function () {
    wrapper = mount(VueDraggableResizable, {
      attachTo: div(),
      propsData: {
        z: 99
      }
    })

    expect(wrapper.props().z).to.equal(99)
    expect(wrapper.vm.$el.style.zIndex).to.equal('99')
  })

  it('should set "auto" as defaul value for zIndex if `z` prop is not provided', function () {
    wrapper = mount(VueDraggableResizable)

    expect(wrapper.vm.$el.style.zIndex).to.equal('auto')
  })

  it('should react to `z` prop changes', async function () {
    wrapper = mount(VueDraggableResizable, {
      attachTo: div(),
      propsData: {
        z: 99
      }
    })

    await wrapper.setProps({ z: 999 })

    expect(wrapper.vm.$data.zIndex).to.equal(999)
  })

  afterEach(() => wrapper.destroy())
})
