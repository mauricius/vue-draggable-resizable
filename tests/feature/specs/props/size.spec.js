import VueDraggableResizable from '@/components/vue-draggable-resizable'
import { mount } from '@vue/test-utils'
import syn from 'syn'

let wrapper

describe('size props', function () {
  it('should set the initial size of the component using `w` and `h` props', function (done) {
    wrapper = mount(VueDraggableResizable, {
      propsData: {
        w: 200,
        h: 150
      }
    })

    expect(wrapper.props().w).to.equal(200)
    expect(wrapper.props().h).to.equal(150)

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$el.style.width).to.equal('200px')
      expect(wrapper.vm.$el.style.height).to.equal('150px')
      done()
    })
  })

  it('should react to size prop changes', function () {
    wrapper = mount(VueDraggableResizable, {
      propsData: {
        w: 200,
        h: 150
      }
    })

    wrapper.setProps({ w: 250, h: 200 })

    expect(wrapper.vm.$el.style.width).to.equal('250px')
    expect(wrapper.vm.$el.style.height).to.equal('200px')
  })

  it('should allow auto value for `w` and `h` props', function (done) {
    wrapper = mount(VueDraggableResizable, {
      propsData: {
        w: 'auto',
        h: 'auto'
      }
    })

    expect(wrapper.props().w).to.equal('auto')
    expect(wrapper.props().h).to.equal('auto')

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.$el.style.width).to.equal('auto')
      expect(wrapper.vm.$el.style.height).to.equal('auto')
      done()
    })
  })

  it('should fallback to numeric values for width and height when the component is resized', function (done) {
    wrapper = mount(VueDraggableResizable, {
      attachToDocument: true,
      propsData: {
        w: 'auto',
        h: 'auto',
        active: true
      },
      slots: {
        default: 'VueDraggableResizable'
      }
    })

    wrapper.vm.$nextTick(() => {
      const $el = wrapper.vm.$el

      const rect = $el.querySelector('div.handle-br').getBoundingClientRect()
      const fromX = rect.left
      const fromY = rect.top

      const { width, height } = $el.getBoundingClientRect()

      syn.drag(
        $el.querySelector('div.handle-br'),
        {
          from: { pageX: fromX, pageY: fromY },
          to: { pageX: fromX + 10, pageY: fromY + 10 },
          duration: 10
        },
        function () {
          expect($el.style.transform).to.equal('translate(0px, 0px)')
          expect($el.style.width).to.equal(`${(width + 10).toFixed(3)}px`)
          expect($el.style.height).to.equal(`${height + 10}px`)

          done()
        }
      )
    })
  })

  it('should change `auto` back to numeric values for width and height', function (done) {
    wrapper = mount(VueDraggableResizable, {
      attachToDocument: true,
      propsData: {
        w: 'auto',
        h: 'auto',
        active: true
      },
      slots: {
        default: 'VueDraggableResizable'
      }
    })

    wrapper.vm.$nextTick(() => {
      const $el = wrapper.vm.$el

      wrapper.setProps({ w: 250, h: 200 })

      expect($el.style.width).to.equal('250px')
      expect($el.style.height).to.equal('200px')

      done()
    })
  })

  afterEach(() => wrapper.destroy())
})
