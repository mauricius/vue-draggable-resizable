import VueDraggableResizable from '@/components/vue-draggable-resizable'
import { mount } from '@vue/test-utils'
import syn from 'syn'
import sinon from 'sinon'

let wrapper

describe('`min-height` and `min-width` props', function () {
  it('should pass `min-height` and `min-width` as props', function () {
    wrapper = mount(VueDraggableResizable, {
      propsData: {
        minHeight: 100,
        minWidth: 200
      }
    })

    expect(wrapper.props().minHeight).to.equal(100)
    expect(wrapper.props().minWidth).to.equal(200)
  })

  it('should react to `min-height` and `min-width` prop changes', function () {
    wrapper = mount(VueDraggableResizable, {
      attachToDocument: true,
      propsData: {
        minHeight: 100,
        minWidth: 200
      }
    })

    wrapper.setProps({ minHeight: 200, minWidth: 300 })

    expect(wrapper.props().minHeight).to.equal(200)
    expect(wrapper.props().minWidth).to.equal(300)
  })

  it('should not resize the component under `min-height` and `min-width`', function (done) {
    wrapper = mount(VueDraggableResizable, {
      attachToDocument: true,
      propsData: {
        minHeight: 100,
        minWidth: 100,
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
          to: { pageX: fromX - 50, pageY: fromY - 50 },
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
