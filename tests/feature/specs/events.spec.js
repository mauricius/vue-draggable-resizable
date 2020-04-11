import VueDraggableResizable from '@/components/vue-draggable-resizable'
import { mount } from '@vue/test-utils'
import syn from 'syn'

let wrapper

describe('events', function () {
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
          to: { pageX: fromX + 10, pageY: fromY + 10 },
          duration: 10
        },
        function () {
          expect(wrapper.emitted()).to.have.property('resizing')
          expect(wrapper.emitted().resizing.pop()).to.deep.equal([0, 0, 110, 110])

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
          to: { pageX: fromX + 10, pageY: fromY + 10 },
          duration: 10
        },
        function () {
          expect(wrapper.emitted()).to.have.property('dragging')
          expect(wrapper.emitted().dragging.pop()).to.deep.equal([10, 10])

          done()
        }
      )
    })
  })

  it('should emit "dragstop" event while stopping dragging the component', function (done) {
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
          to: { pageX: fromX + 10, pageY: fromY + 10 },
          duration: 10
        },
        function () {
          expect(wrapper.emitted()).to.have.property('dragstop')
          expect(wrapper.emitted().dragstop[0]).to.deep.equal([10, 10])

          done()
        }
      )
    })
  })

  afterEach(() => wrapper.destroy())
})
