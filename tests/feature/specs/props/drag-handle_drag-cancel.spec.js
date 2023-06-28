import VueDraggableResizable from '@/components/vue-draggable-resizable'
import { mount } from '@vue/test-utils'
import syn from 'syn'
import div from '../../div'

let wrapper

describe('`drag-handle` prop', async function () {
  it('should activate the component from the selector identified by the `drag-handle` prop', async function () {
    wrapper = mount(VueDraggableResizable, {
      attachTo: div(),
      propsData: {
        dragHandle: '.drag-handle'
      },
      slots: {
        default: '<div class="drag-handle">Drag only me</div>'
      }
    })

    await wrapper.find('.drag-handle').trigger('mousedown')

    expect(wrapper.emitted()).to.have.property('activated')
    expect(wrapper.emitted()).to.have.property('update:active')
  })

  it('should not activate the component from outside the selector identified by the `drag-handle` prop', async function () {
    wrapper = mount(VueDraggableResizable, {
      attachTo: div(),
      propsData: {
        dragHandle: '.drag-handle'
      },
      slots: {
        default: '<div class="drag-handle">Drag only me</div>'
      }
    })

    await wrapper.trigger('mousedown')

    expect(wrapper.emitted()).to.not.have.property('activated')
    expect(wrapper.emitted()).to.not.have.property('update:active')
  })

  it('should drag the component only from the selector identified by the `drag-handle` prop', function (done) {
    wrapper = mount(VueDraggableResizable, {
      attachTo: div(),
      propsData: {
        dragHandle: '.drag-handle',
        x: 0,
        y: 0,
        w: 100,
        h: 100
      },
      slots: {
        default: '<div class="drag-handle">Drag only me</div>'
      }
    })

    const $el = wrapper.vm.$el

    const rect = $el.querySelector('.drag-handle').getBoundingClientRect()
    const fromX = rect.left
    const fromY = rect.top

    syn.drag(
      $el.querySelector('.drag-handle'),
      {
        from: { pageX: fromX, pageY: fromY },
        to: { pageX: fromX + 100, pageY: fromY + 100 },
        duration: 10
      },
      async function () {
        await wrapper.vm.$nextTick()

        expect($el.style.transform).to.equal('translate(100px, 100px)')

        done()
      }
    )
  })
})

describe('`drag-cancel` prop', function () {
  it('should not activate the component from the selector identified by the `drag-cancel` prop', async function () {
    wrapper = mount(VueDraggableResizable, {
      attachTo: div(),
      propsData: {
        dragCancel: '.drag-cancel'
      },
      slots: {
        default: '<div class="drag-cancel">Drag is not allowed here</div>'
      }
    })

    await wrapper.find('.drag-cancel').trigger('mousedown')

    expect(wrapper.emitted()).to.not.have.property('activated')
    expect(wrapper.emitted()).to.not.have.property('update:active')
  })

  it('should activate the component from outside the selector identified by the `drag-cancel` prop', async function () {
    wrapper = mount(VueDraggableResizable, {
      attachTo: div(),
      propsData: {
        dragCancel: '.drag-cancel'
      },
      slots: {
        default: '<div class="drag-cancel">Drag is not allowed here</div>'
      }
    })

    await wrapper.trigger('mousedown')

    expect(wrapper.emitted()).to.have.property('activated')
    expect(wrapper.emitted()).to.have.property('update:active')
  })

  afterEach(() => wrapper.destroy())
})
