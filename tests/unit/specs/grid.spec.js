import Vue from 'vue'
import VueDraggableResizable from '@/components/vue-draggable-resizable'
import { mount } from '@vue/test-utils'
import syn from 'syn'

let wrapper

describe('grid prop', function () {
  it('should provide the grid as prop', function () {
    wrapper = mount(VueDraggableResizable, {
      propsData: {
        grid: [20, 40]
      }
    })

    expect(wrapper.props().grid[0]).to.equal(20)
    expect(wrapper.props().grid[1]).to.equal(40)
  })

  it('should react to the grid prop', function () {
    wrapper = mount(VueDraggableResizable, {
      propsData: {
        grid: [20, 40]
      }
    })

    wrapper.setProps({ grid: [10, 30] })

    expect(wrapper.props().grid[0]).to.equal(10)
    expect(wrapper.props().grid[1]).to.equal(30)
  })

  it('should not drag the component on the grid if the drag is too small', function (done) {
    wrapper = mount(VueDraggableResizable, {
      attachToDocument: true,
      propsData: {
        x: 0,
        y: 0,
        w: 100,
        h: 100,
        grid: [20, 40]
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
          to: { pageX: fromX + 1, pageY: fromY + 1 }
        },
        function () {
          expect($el.style.top).to.equal('0px')
          expect($el.style.left).to.equal('0px')

          done()
        }
      )
    })
  })

  it('should drag the component on the grid if the drag is correct', function (done) {
    wrapper = mount(VueDraggableResizable, {
      attachToDocument: true,
      propsData: {
        x: 0,
        y: 0,
        w: 100,
        h: 100,
        grid: [20, 40]
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
          to: { pageX: fromX + 20, pageY: fromY + 40 }
        },
        function () {
          expect($el.style.top).to.equal('40px')
          expect($el.style.left).to.equal('20px')

          done()
        }
      )
    })
  })

  it('should not resize the component on the grid if the resize is too small', function (done) {
    wrapper = mount(VueDraggableResizable, {
      attachToDocument: true,
      propsData: {
        x: 0,
        y: 0,
        w: 100,
        h: 100,
        grid: [20, 40],
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
          to: { pageX: fromX + 1, pageY: fromY + 1 }
        },
        function () {
          expect($el.style.width).to.equal('100px')
          expect($el.style.height).to.equal('100px')

          done()
        }
      )
    })
  })

  it('should resize the component on the grid if the resize is correct', function (done) {
    wrapper = mount(VueDraggableResizable, {
      attachToDocument: true,
      propsData: {
        x: 0,
        y: 0,
        w: 100,
        h: 100,
        grid: [20, 40],
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
          to: { pageX: fromX + 20, pageY: fromY + 40 }
        },
        function () {
          expect($el.style.width).to.equal('120px')
          expect($el.style.height).to.equal('140px')

          done()
        }
      )
    })
  })

  it('should not resize the component lower grid values even if minHeight and minWidth are lower', function (done) {
    wrapper = mount(VueDraggableResizable, {
      attachToDocument: true,
      propsData: {
        x: 0,
        y: 0,
        w: 100,
        h: 120,
        minHeight: 30,
        minWidth: 30,
        grid: [20, 40],
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
          to: { pageX: fromX - 80, pageY: fromY - 80 }
        },
        function () {
          expect($el.style.width).to.equal('40px')
          expect($el.style.height).to.equal('40px')

          done()
        }
      )
    })
  })

  afterEach(() => wrapper.destroy())
})
