import VueDraggableResizable from '@/components/vue-draggable-resizable'
import { mount } from '@vue/test-utils'
import div from '../../div'

let wrapper

describe('`handles` prop', function () {
  it('should render only the handles passed with `handles` props', function () {
    wrapper = mount(VueDraggableResizable, {
      propsData: {
        handles: ['tl', 'tm', 'tr', 'bl', 'bm', 'br']
      }
    })

    expect(wrapper.props().handles).to.have.length(6)
    expect(wrapper.findAll('div.handle').length).to.equal(6)
  })

  it('should not render the handles if `handles` props is empty', function () {
    wrapper = mount(VueDraggableResizable, {
      propsData: {
        handles: []
      }
    })

    expect(wrapper.findAll('div.handle').length).to.equal(0)
  })

  it('should react to `handles` prop changes', async function () {
    wrapper = mount(VueDraggableResizable, {
      attachTo: div(),
      propsData: {
        handles: []
      }
    })

    await wrapper.setProps({ handles: ['tl', 'tm', 'tr', 'bl', 'bm', 'br'] })

    expect(wrapper.props().handles).to.have.length(6)
    expect(wrapper.findAll('div.handle').length).to.equal(6)
  })

  afterEach(() => wrapper.destroy())
})
