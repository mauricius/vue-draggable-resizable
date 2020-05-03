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

describe('`onDrag` and `onResize` props', function () {
  it('should call `onDrag` callback when the component is dragged', function (done) {
    const onDragCallback = sinon.spy()

    wrapper = mount(VueDraggableResizable, {
      attachToDocument: true,
      propsData: {
        onDrag: onDragCallback,
        active: true,
        w: 100,
        h: 100
      }
    })

    wrapper.vm.$nextTick(() => {
      const $el = wrapper.vm.$el
      const rect = $el.getBoundingClientRect()

      const fromX = rect.left + rect.width / 2
      const fromY = rect.top + rect.height / 2

      syn.drag(
        $el,
        {
          from: { pageX: fromX, pageY: fromY },
          to: { pageX: fromX + 50, pageY: fromY + 50 }
        },
        function () {
          sinon.assert.called(onDragCallback)
          sinon.assert.calledWith(onDragCallback, 0, 0)

          done()
        }
      )
    })
  })

  it('should prevent dragging the component if the `onDrag` callback returns false', function (done) {
    const onDragCallback = (x, y) => {
      if (x > 10) return false
      if (y > 10) return false
    }

    wrapper = mount(VueDraggableResizable, {
      attachToDocument: true,
      propsData: {
        onDrag: onDragCallback,
        active: true,
        w: 100,
        h: 100
      }
    })

    wrapper.vm.$nextTick(() => {
      const $el = wrapper.vm.$el
      const rect = $el.getBoundingClientRect()

      const fromX = rect.left + rect.width / 2
      const fromY = rect.top + rect.height / 2

      syn.drag(
        $el,
        {
          from: { pageX: fromX, pageY: fromY },
          to: { pageX: fromX + 50, pageY: fromY + 50 },
          duration: 1500
        },
        function () {
          expect($el.style.transform).to.equal('translate(10px, 10px)')
          expect($el.style.width).to.equal('100px')
          expect($el.style.height).to.equal('100px')

          done()
        }
      )
    })
  })

  it('should call `onResize` callback when the component is resized', function (done) {
    const onResizeCallback = sinon.spy()

    wrapper = mount(VueDraggableResizable, {
      attachToDocument: true,
      propsData: {
        onResize: onResizeCallback,
        active: true,
        w: 100,
        h: 100
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
          sinon.assert.called(onResizeCallback)
          sinon.assert.calledWith(onResizeCallback, 'br', 0, 0, 100, 100)

          done()
        }
      )
    })
  })

  it('should prevent resizing the component if the `onResize` callback returns false', function (done) {
    const onResizeCallback = (handle, x, y, w, h) => {
      if (w > 110) return false
      if (h > 110) return false
    }

    wrapper = mount(VueDraggableResizable, {
      attachToDocument: true,
      propsData: {
        active: true,
        w: 100,
        h: 100,
        onResize: onResizeCallback
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
          duration: 1500
        },
        function () {
          expect($el.style.width).to.equal('110px')
          expect($el.style.height).to.equal('110px')

          done()
        }
      )
    })
  })

  afterEach(() => wrapper.destroy())
})
