import VueDraggableResizable from '@/components/vue-draggable-resizable'
import { mount } from '@vue/test-utils'
import syn from 'syn'
import sinon from 'sinon'

let wrapper

describe('`onDragStart` and `onResizeStart` props', function () {
  it('should call `onDragStart` callback when the component is clicked', function () {
    const onDragStartCallback = sinon.spy()

    wrapper = mount(VueDraggableResizable, {
      attachToDocument: true,
      propsData: {
        onDragStart: onDragStartCallback
      }
    })

    wrapper.trigger('mousedown')

    sinon.assert.called(onDragStartCallback)
  })

  it('should prevent activation of the component if the `onDragStart` callback returns false', function () {
    const onDragStartCallback = () => false

    wrapper = mount(VueDraggableResizable, {
      attachToDocument: true,
      propsData: {
        onDragStart: onDragStartCallback
      }
    })

    wrapper.trigger('mousedown')

    expect(wrapper.emitted()).to.not.have.property('activated')
    expect(wrapper.classes()).to.not.contain('active')
  })

  it('should call `onResizeStart` callback when the component is resized', function (done) {
    const onResizeStartCallback = sinon.spy()

    wrapper = mount(VueDraggableResizable, {
      attachToDocument: true,
      propsData: {
        active: true,
        onResizeStart: onResizeStartCallback
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
          sinon.assert.called(onResizeStartCallback)

          done()
        }
      )
    })
  })

  it('should prevent resizing the component if the `onResizeStart` callback returns false', function (done) {
    const onResizeStartCallback = () => false

    wrapper = mount(VueDraggableResizable, {
      attachToDocument: true,
      propsData: {
        active: true,
        w: 100,
        h: 100,
        onResizeStart: onResizeStartCallback
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
