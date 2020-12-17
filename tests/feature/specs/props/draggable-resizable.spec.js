import VueDraggableResizable from '@/components/vue-draggable-resizable'
import { mount } from '@vue/test-utils'
import syn from 'syn'
import div from '../../div'

let wrapper

describe('native dragging', function () {
  it('should enable native drag by setting the `enable-native-drag` prop', function () {
    wrapper = mount(VueDraggableResizable, {
      attachTo: div(),
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

  it('should not have the `draggable` class if the `draggable` prop is false', function () {
    wrapper = mount(VueDraggableResizable, {
      attachTo: div(),
      propsData: {
        draggable: false
      }
    })

    expect(wrapper.props().draggable).to.be.false
    expect(wrapper.classes()).to.not.contain('draggable')
    expect(wrapper.classes()).to.contain('resizable')
  })

  it('should react to `draggable` prop changes', async function () {
    wrapper = mount(VueDraggableResizable, {
      attachTo: div(),
      propsData: {
        draggable: false
      }
    })

    await wrapper.setProps({ draggable: true })

    expect(wrapper.classes()).to.contain('draggable')
  })

  it('should not be draggable if `draggable` prop is false', function (done) {
    wrapper = mount(VueDraggableResizable, {
      attachTo: div(),
      propsData: {
        x: 0,
        y: 0,
        w: 100,
        h: 100,
        draggable: false
      }
    })

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
      async function () {
        await wrapper.vm.$nextTick()

        expect($el.style.transform).to.equal('translate(0px, 0px)')
        expect($el.style.width).to.equal('100px')
        expect($el.style.height).to.equal('100px')

        done()
      }
    )
  })
})

describe('component resizable', function () {
  it('should have `resizable` class by default', function () {
    wrapper = mount(VueDraggableResizable)

    expect(wrapper.classes()).to.contain('resizable')
  })

  it('should not have the `resizable` class if the `resizable` prop is false', function () {
    wrapper = mount(VueDraggableResizable, {
      attachTo: div(),
      propsData: {
        resizable: false
      }
    })

    expect(wrapper.props().resizable).to.be.false
    expect(wrapper.classes()).to.not.contain('resizable')
    expect(wrapper.classes()).to.contain('draggable')
  })

  it('should not render handles if the `resizable` prop is false', function () {
    wrapper = mount(VueDraggableResizable, {
      attachTo: div(),
      propsData: {
        active: true,
        resizable: false
      }
    })

    expect(wrapper.findAll('div.handle').length).to.equal(0)
  })

  it('should react to `resizable` prop changes', async function () {
    wrapper = mount(VueDraggableResizable, {
      attachTo: div(),
      propsData: {
        resizable: false
      }
    })

    await wrapper.setProps({ resizable: true })

    expect(wrapper.classes()).to.contain('resizable')
  })

  afterEach(() => wrapper.destroy())
})
