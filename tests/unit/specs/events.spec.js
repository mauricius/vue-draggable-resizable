import Vue from 'vue'
import VueDraggableResizable from '@/components/vue-draggable-resizable'
import { mount, shallowMount } from '@vue/test-utils'
import syn from 'syn'

let wrapper

describe('events', function () {
  /************
   * Dragging *
   ************/
  it('should emit "resizing" event while resizing the component', function (done) {
    wrapper = mount(VueDraggableResizable, {
      attachToDocument: true,
      propsData: {
        w: 100,
        h: 100,
        active: true
      }
    })

    wrapper.vm.$nextTick().then(function () {
      const $el = wrapper.vm.$el
      const rect = $el.querySelector('div.handle-br').getBoundingClientRect()
      const fromX = rect.left
      const fromY = rect.top

      syn.drag(
        $el.querySelector('div.handle-br'),
        {
          from: { pageX: fromX, pageY: fromY },
          to: { pageX: fromX + 10, pageY: fromY + 10 }
        },
        function () {
          expect(wrapper.emitted()).to.have.property('resizing')

          done()
        }
      )
    })
  })

  it('should emit "dragging" event while dragging the component', function (done) {
    wrapper = mount(VueDraggableResizable, {
      attachToDocument: true,
      propsData: {
        w: 100,
        h: 100,
        active: true
      }
    })

    wrapper.vm.$nextTick().then(function () {
      const $el = wrapper.vm.$el
      const rect = $el.getBoundingClientRect()
      const fromX = rect.left + rect.width / 2
      const fromY = rect.top + rect.height / 2

      syn.drag(
        $el,
        {
          from: { pageX: fromX, pageY: fromY },
          to: { pageX: fromX + 10, pageY: fromY + 10 }
        },
        function () {
          expect(wrapper.emitted()).to.have.property('dragging')

          done()
        }
      )
    })
  })

  afterEach(() => wrapper.destroy())
})
