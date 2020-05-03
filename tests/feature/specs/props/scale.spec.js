import VueDraggableResizable from '@/components/vue-draggable-resizable'
import { mount } from '@vue/test-utils'
import syn from 'syn'

let wrapper

describe('`scale` prop', function () {
  it('should drag the component accordingly to the `scale` prop', function (done) {
    const ParentComponent = {
      template: `<div>
        <vue-draggable-resizable :x="0" :y="0" :w="200" :h="200" :scale="0.5" :active="true"></vue-draggable-resizable>
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

      const rect = $el.getBoundingClientRect()
      const fromX = rect.left
      const fromY = rect.top

      syn.drag(
        $el,
        {
          from: { pageX: fromX, pageY: fromY },
          to: { pageX: fromX + 50, pageY: fromY + 50 },
          duration: 10
        },
        function () {
          expect($el.style.transform).to.equal('translate(100px, 100px)')

          done()
        }
      )
    })
  })

  it('should resize the component accordingly to the `scale` prop', function (done) {
    const ParentComponent = {
      template: `<div>
        <vue-draggable-resizable :x="0" :y="0" :w="200" :h="200" :scale="1.5" :active="true"></vue-draggable-resizable>
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

      const rect = $el.querySelector('div.handle-br').getBoundingClientRect()
      const fromX = rect.left
      const fromY = rect.top

      syn.drag(
        $el,
        {
          from: { pageX: fromX, pageY: fromY },
          to: { pageX: fromX + 50, pageY: fromY + 50 },
          duration: 10
        },
        function () {
          expect($el.style.width).to.equal('233px')
          expect($el.style.height).to.equal('233px')

          done()
        }
      )
    })
  })

  afterEach(() => wrapper.destroy())
})
