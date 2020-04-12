import VueDraggableResizable from '@/components/vue-draggable-resizable'
import { mount } from '@vue/test-utils'
import syn from 'syn'

let wrapper

describe('axis prop', function () {
  it('should provide the draggable `axis` prop to the component', function () {
    wrapper = mount(VueDraggableResizable, {
      attachToDocument: true,
      propsData: {
        axis: 'x'
      }
    })

    expect(wrapper.props().axis).to.equal('x')
  })

  it('should effectively drag the component only on the horizontal axis', function (done) {
    wrapper = mount(VueDraggableResizable, {
      attachToDocument: true,
      propsData: {
        axis: 'x',
        x: 0,
        y: 0,
        w: 100,
        h: 100
      }
    })

    wrapper.vm.$nextTick(() => {
      const $el = wrapper.vm.$el

      const rect = $el.getBoundingClientRect()
      const fromX = rect.left
      const fromY = rect.top

      syn.drag(
        $el,
        {
          from: { pageX: fromX, pageY: fromY },
          to: { pageX: fromX + 100, pageY: fromY + 100 },
          duration: 10
        },
        function () {
          expect($el.style.transform).to.equal('translate(100px, 0px)')

          done()
        }
      )
    })
  })

  it('should effectively drag the component only on the vertical axis', function (done) {
    wrapper = mount(VueDraggableResizable, {
      attachToDocument: true,
      propsData: {
        axis: 'y',
        x: 0,
        y: 0,
        w: 100,
        h: 100
      }
    })

    wrapper.vm.$nextTick(() => {
      const $el = wrapper.vm.$el

      const rect = $el.getBoundingClientRect()
      const fromX = rect.left
      const fromY = rect.top

      syn.drag(
        $el,
        {
          from: { pageX: fromX, pageY: fromY },
          to: { pageX: fromX + 100, pageY: fromY + 100 },
          duration: 10
        },
        function () {
          expect($el.style.transform).to.equal('translate(0px, 100px)')

          done()
        }
      )
    })
  })

  afterEach(() => wrapper.destroy())
})
