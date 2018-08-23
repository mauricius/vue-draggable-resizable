import Vue from 'vue'
import VueDraggableResizable from '@/components/vue-draggable-resizable'
import { mount } from '@vue/test-utils'
import syn from 'syn'

let wrapper

describe('aspect ratio', function () {
  it('should provide the lockAspectRatio as prop', function () {
    wrapper = mount(VueDraggableResizable, {
      propsData: {
        lockAspectRatio: true
      }
    })

    expect(wrapper.props().lockAspectRatio).to.be.true
  })

  it('should resize the component accordingly to its aspect ratio if lockAspectRatio is true', function (done) {
    wrapper = mount(VueDraggableResizable, {
      attachToDocument: true,
      propsData: {
        w: 200,
        h: 100,
        active: true,
        lockAspectRatio: true
      }
    })

    wrapper.vm.$nextTick(() => {
      const $el = wrapper.vm.$el

      const rect = $el.querySelector('div.handle-mr').getBoundingClientRect()
      const fromX = rect.left
      const fromY = rect.top

      syn.drag(
        $el.querySelector('div.handle-mr'),
        {
          from: { pageX: fromX, pageY: fromY },
          to: { pageX: fromX + 100, pageY: fromY }
        },
        function () {
          expect($el.style.width).to.equal('300px')
          expect($el.style.height).to.equal('150px')

          done()
        }
      )
    })
  })

  afterEach(() => wrapper.destroy())
})
