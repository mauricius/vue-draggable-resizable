import VueDraggableResizable from '@/components/vue-draggable-resizable'
import { mount } from '@vue/test-utils'
import syn from 'syn'

let wrapper

describe('`lock-aspect-ratio` prop', function () {
  it('should provide the `lock-aspect-ratio` as prop', function () {
    wrapper = mount(VueDraggableResizable, {
      propsData: {
        lockAspectRatio: true
      }
    })

    expect(wrapper.props().lockAspectRatio).to.be.true
  })

  it('should resize the component accordingly to its aspect ratio if `lock-aspect-ratio` is true', function (done) {
    wrapper = mount(VueDraggableResizable, {
      attachToDocument: true,
      propsData: {
        w: 200,
        h: 100,
        active: true,
        lockAspectRatio: true
      }
    })

    wrapper.vm.$nextTick(() => {
      const $el = wrapper.vm.$el

      const rect = $el.querySelector('div.handle-mr').getBoundingClientRect()
      const fromX = rect.left
      const fromY = rect.top

      syn.drag(
        $el.querySelector('div.handle-mr'),
        {
          from: { pageX: fromX, pageY: fromY },
          to: { pageX: fromX + 100, pageY: fromY },
          duration: 10
        },
        function () {
          expect($el.style.width).to.equal('300px')
          expect($el.style.height).to.equal('150px')

          done()
        }
      )
    })
  })

  it('should not resize the component outside the parent node if `parent` prop is true and `lock-aspect-ratio` is set', function (done) {
    const ParentComponent = {
      template: `<div class="parent" style="width: 500px; height: 500px;">
        <vue-draggable-resizable :w="300" :h="400" :parent="true" :active="true" :lock-aspect-ratio="true"></vue-draggable-resizable>
      </div>`,
      components: {
        VueDraggableResizable
      }
    }

    wrapper = mount(ParentComponent, {
      attachToDocument: true
    })

    wrapper.vm.$nextTick(() => {
      const $el = wrapper.vm.$children[0].$el

      const rect = $el.querySelector('div.handle-mr').getBoundingClientRect()
      const fromX = rect.left
      const fromY = rect.top

      syn.drag(
        $el.querySelector('div.handle-br'),
        {
          from: { pageX: fromX, pageY: fromY },
          to: { pageX: fromX + 100, pageY: fromY },
          duration: 10
        },
        function () {
          expect($el.style.transform).to.equal('translate(0px, 0px)')
          expect($el.style.width).to.equal('375px')
          expect($el.style.height).to.equal('500px')

          done()
        }
      )
    })
  })

  afterEach(() => wrapper.destroy())
})
