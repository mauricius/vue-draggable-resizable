import VueDraggableResizable from '@/components/vue-draggable-resizable'
import { mount } from '@vue/test-utils'
import syn from 'syn'

let wrapper

describe('native dragging', function () {
  it('should enable native drag by setting the `enable-native-drag` prop', function () {
    wrapper = mount(VueDraggableResizable, {
      attachToDocument: true,
      propsData: {
        enableNativeDrag: true
      }
    })

    expect(wrapper.props().enableNativeDrag).to.be.true
  })
})

describe('component draggable', function () {
  it('should have the `draggable` class by default', function () {
    wrapper = mount(VueDraggableResizable)

    expect(wrapper.classes()).to.contain('draggable')
  })

  it('should not have the `draggable` class if the `draggable` prop is false', function (done) {
    wrapper = mount(VueDraggableResizable, {
      attachToDocument: true,
      propsData: {
        draggable: false
      }
    })

    expect(wrapper.props().draggable).to.be.false

    wrapper.vm.$nextTick(() => {
      expect(wrapper.classes()).to.not.contain('draggable')

      done()
    })
  })

  it('should react to `draggable` prop changes', function () {
    wrapper = mount(VueDraggableResizable, {
      attachToDocument: true,
      propsData: {
        draggable: false
      }
    })

    wrapper.setProps({ draggable: true })

    expect(wrapper.classes()).to.contain('draggable')
  })

  it('should not be draggable if `draggable` prop is false', function (done) {
    wrapper = mount(VueDraggableResizable, {
      attachToDocument: true,
      propsData: {
        x: 0,
        y: 0,
        w: 100,
        h: 100,
        draggable: false
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
          expect($el.style.transform).to.equal('translate(0px, 0px)')
          expect($el.style.width).to.equal('100px')
          expect($el.style.height).to.equal('100px')

          done()
        }
      )
    })
  })
})

describe('component resizable', function () {
  it('should have `resizable` class by default', function () {
    wrapper = mount(VueDraggableResizable)

    expect(wrapper.classes()).to.contain('resizable')
  })

  it('should not have the `resizable` class if the `resizable` prop is false', function (done) {
    wrapper = mount(VueDraggableResizable, {
      attachToDocument: true,
      propsData: {
        resizable: false
      }
    })

    expect(wrapper.props().resizable).to.be.false

    wrapper.vm.$nextTick(() => {
      expect(wrapper.classes()).to.not.contain('resizable')

      done()
    })
  })

  it('should not render handles if the `resizable` prop is false', function () {
    wrapper = mount(VueDraggableResizable, {
      attachToDocument: true,
      propsData: {
        active: true,
        resizable: false
      }
    })

    expect(wrapper.findAll('div.handle').length).to.equal(0)
  })

  it('should react to `resizable` prop changes', function () {
    wrapper = mount(VueDraggableResizable, {
      attachToDocument: true,
      propsData: {
        resizable: false
      }
    })

    wrapper.setProps({ resizable: true })

    expect(wrapper.classes()).to.contain('resizable')
  })

  afterEach(() => wrapper.destroy())
})
