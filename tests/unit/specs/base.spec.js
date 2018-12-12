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

  it('should permit focusing a form input inside the slot', function (done) {
    wrapper = mount(VueDraggableResizable, {
      slots: {
        default: '<input type="text" class="input" />'
      }
    })

    wrapper.find('.input').trigger('mousedown')

    expect(wrapper.emitted()).to.have.property('activated')

    wrapper.vm.$nextTick(() => {
      expect(wrapper.classes()).to.contain('active')
      done()
    })
  })

  afterEach(() => wrapper.destroy())
})
