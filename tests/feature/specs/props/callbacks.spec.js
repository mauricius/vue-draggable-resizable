import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'
import { mount } from '@vue/test-utils'
import { describe, it, expect, afterEach, vi } from 'vitest'
import syn from 'syn'
import div from '../../div'

let wrapper

describe('`onDragStart` and `onResizeStart` props', function () {
  it('should call `onDragStart` callback when the component is clicked', function () {
    const onDragStartCallback = vi.fn()
    
    wrapper = mount(VueDraggableResizable, {
      attachTo: div(),
      propsData: {
        onDragStart: onDragStartCallback
      }
    })
    
    wrapper.trigger('mousedown')
    
    expect(onDragStartCallback).toHaveBeenCalled()
  })

  it('should prevent activation of the component if the `onDragStart` callback returns false', async function () {
    const onDragStartCallback = () => false

    wrapper = mount(VueDraggableResizable, {
      attachTo: div(),
      propsData: {
        onDragStart: onDragStartCallback
      }
    })

    await wrapper.trigger('mousedown')

    expect(wrapper.emitted()).to.not.have.property('activated')
    expect(wrapper.classes()).to.not.contain('active')
  })

  it('should call `onResizeStart` callback when the component is resized', function (done) {
    const onResizeStartCallback = vi.fn()

    wrapper = mount(VueDraggableResizable, {
      attachTo: div(),
      propsData: {
        active: true,
        onResizeStart: onResizeStartCallback
      }
    })

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
        expect(onDragStartCallback).toHaveBeenCalled()

        done()
      }
    )
  })

  it('should prevent resizing the component if the `onResizeStart` callback returns false', function (done) {
    const onResizeStartCallback = () => false

    wrapper = mount(VueDraggableResizable, {
      attachTo: div(),
      propsData: {
        active: true,
        w: 100,
        h: 100,
        onResizeStart: onResizeStartCallback
      }
    })

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
      async function () {
        await wrapper.vm.$nextTick()

        expect($el.style.width).to.equal('100px')
        expect($el.style.height).to.equal('100px')

        done()
      }
    )
  })

  afterEach(() => wrapper.unmount())
})

describe('`onDrag` and `onResize` props', function () {
  it('should call `onDrag` callback when the component is dragged', function (done) {
    const onDragCallback = vi.fn()

    wrapper = mount(VueDraggableResizable, {
      attachTo: div(),
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
          expect(onDragStartCallback).toHaveBeenCalled()
          expect(onDragStartCallback).toHaveBeenCalledWith('br', 0, 0, 100, 100)

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
      attachTo: div(),
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
    const onResizeCallback = vi.fn()

    wrapper = mount(VueDraggableResizable, {
      attachTo: div(),
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
          expect(onDragStartCallback).toHaveBeenCalled()
          expect(onDragStartCallback).toHaveBeenCalledWith('br', 0, 0, 100, 100)

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
      attachTo: div(),
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

  afterEach(() => wrapper.unmount())
})
