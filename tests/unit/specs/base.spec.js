import Vue from 'vue'
import VueDraggableResizable from '@/components/vue-draggable-resizable'
import { mount } from '@vue/test-utils'

let wrapper

describe('base functions', function () {
  it('should render correctly', function () {
    wrapper = mount(VueDraggableResizable)

    expect(wrapper.vm.$el).to.be.ok
    expect(wrapper.is('div')).to.be.true
    expect(wrapper.classes()).to.contain('vdr')
  })

  it('should render the elements in default slot', function () {
    wrapper = mount(VueDraggableResizable, {
      slots: {
        default: '<p>Resize Me</p>'
      }
    })

    expect(wrapper.contains('p')).to.be.true
    expect(wrapper.text()).to.equal('Resize Me')
  })

  it('should attach 8 handles by default', function () {
    wrapper = mount(VueDraggableResizable)

    expect(wrapper.findAll('div.handle').length).to.equal(8)
  })

  afterEach(() => wrapper.destroy())
})
