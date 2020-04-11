import VueDraggableResizable from '@/components/vue-draggable-resizable'
import { mount } from '@vue/test-utils'
import syn from 'syn'

let wrapper

describe('size props', function () {
  it('should set the initial size of the component using `w` and `h` props', function (done) {
    wrapper = mount(VueDraggableResizable, {
      propsData: {
        w: 200,
        h: 150
      }
    })

    expect(wrapper.props().w).to.equal(200)
    expect(wrapper.props().h).to.equal(150)

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$el.style.width).to.equal('200px')
      expect(wrapper.vm.$el.style.height).to.equal('150px')
      done()
    })
  })

  it('should react to size prop changes', function () {
    wrapper = mount(VueDraggableResizable, {
      propsData: {
        w: 200,
        h: 150
      }
    })

    wrapper.setProps({ w: 250, h: 200 })

    expect(wrapper.vm.$el.style.width).to.equal('250px')
    expect(wrapper.vm.$el.style.height).to.equal('200px')
  })

  afterEach(() => wrapper.destroy())
})
