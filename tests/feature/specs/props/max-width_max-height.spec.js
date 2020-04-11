import VueDraggableResizable from '@/components/vue-draggable-resizable'
import { mount } from '@vue/test-utils'
import syn from 'syn'

let wrapper

describe('`max-width` and `max-height` props', function () {
  it('should pass `max-width` and `max-height` as props', function () {
    wrapper = mount(VueDraggableResizable, {
      propsData: {
        maxWidth: 200,
        maxHeight: 300
      }
    })

    expect(wrapper.props().maxWidth).to.equal(200)
    expect(wrapper.props().maxHeight).to.equal(300)
  })

  it('should react to `max-width` and `max-height` prop changes', function () {
    wrapper = mount(VueDraggableResizable, {
      attachToDocument: true,
      propsData: {
        maxWidth: 200,
        maxHeight: 300
      }
    })

    wrapper.setProps({ maxWidth: 300, maxHeight: 200 })

    expect(wrapper.props().maxWidth).to.equal(300)
    expect(wrapper.props().maxHeight).to.equal(200)
  })

  it('should not resize the component over `max-width` and `max-height` props', function (done) {
    wrapper = mount(VueDraggableResizable, {
      attachToDocument: true,
      propsData: {
        maxWidth: 100,
        maxHeight: 100,
        w: 100,
        h: 100,
        active: true
      }
    })

    wrapper.vm.$nextTick(() => {
      const $el = wrapper.vm.$el

      const rect = $el.querySelector('div.handle-br').getBoundingClientRect()
      const fromX = rect.left
      const fromY = rect.top

      syn.drag(
        $el.querySelector('div.handle-br'),
        {
          from: { pageX: fromX, pageY: fromY },
          to: { pageX: fromX + 50, pageY: fromY + 50 },
          duration: 10
        },
        function () {
          expect($el.style.width).to.equal('100px')
          expect($el.style.height).to.equal('100px')

          done()
        }
      )
    })
  })

  afterEach(() => wrapper.destroy())
})
