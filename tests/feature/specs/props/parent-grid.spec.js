import VueDraggableResizable from '@/components/vue-draggable-resizable'
import { mount } from '@vue/test-utils'
import syn from 'syn'

let wrapper

describe('`parent` and `grid` props', function (done) {
  it('should not drag the component outside the parent node when grid is an exact dividend of the parent size', function (done) {
    const ParentComponent = {
      template: `<div class="parent" style="width: 400px; height: 400px;">
        <vue-draggable-resizable :x="0" :y="0" :w="300" :h="300" :parent="true" :active="true" :grid=[20,20]></vue-draggable-resizable>
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
      const fromX = rect.left + rect.width / 2
      const fromY = rect.top + rect.height / 2

      syn.drag(
        $el,
        {
          from: { pageX: fromX, pageY: fromY },
          to: { pageX: fromX + 120, pageY: fromY + 120 },
          duration: 10
        },
        function () {
          expect($el.style.transform).to.equal('translate(100px, 100px)')

          done()
        }
      )
    })
  })

  it('should not resize the component outside the parent node when the grid is an exact dividend of the parent size', function (done) {
    const ParentComponent = {
      template: `<div class="parent" style="width: 400px; height: 400px;">
        <vue-draggable-resizable :x="0" :y="0" :w="300" :h="300" :parent="true" :active="true" :grid=[20,20]></vue-draggable-resizable>
      </div>`,
      components: {
        VueDraggableResizable
      }
    }

    wrapper = mount(ParentComponent, {
      attachToDocument: true
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
          to: { pageX: fromX + 120, pageY: fromY + 120 },
          duration: 10
        },
        function () {
          expect($el.style.width).to.equal('400px')
          expect($el.style.height).to.equal('400px')

          done()
        }
      )
    })
  })

  it('should not drag the component outside the parent node when grid is not an exact dividend of the parent size', function (done) {
    const ParentComponent = {
      template: `<div class="parent" style="width: 400px; height: 400px;">
        <vue-draggable-resizable :parent="true" :grid=[24,24] :x="0" :y="0" :w="360" :h="360" :active="true"></vue-draggable-resizable>
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
      const fromX = rect.left + rect.width / 2
      const fromY = rect.top + rect.height / 2

      syn.drag(
        $el,
        {
          from: { pageX: fromX, pageY: fromY },
          to: { pageX: fromX + 48, pageY: fromY + 48 },
          duration: 10
        },
        function () {
          expect($el.style.transform).to.equal('translate(24px, 24px)')

          done()
        }
      )
    })
  })

  it('should not resize the component outside the parent node when the grid is not an exact dividend of the parent size', function (done) {
    const ParentComponent = {
      template: `<div class="parent" style="width: 400px; height: 400px;">
        <vue-draggable-resizable :parent="true" :grid=[24,24] :x="0" :y="0" :w="360" :h="360" :active="true"></vue-draggable-resizable>
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
        $el.querySelector('div.handle-br'),
        {
          from: { pageX: fromX, pageY: fromY },
          to: { pageX: fromX + 50, pageY: fromY + 50 },
          duration: 10
        },
        function () {
          expect($el.style.width).to.equal('384px')
          expect($el.style.height).to.equal('384px')

          done()
        }
      )
    })
  })

  it('should not drag the component outside the parent node when component has offset and grid is not an exact dividend of the parent size', function (done) {
    const ParentComponent = {
      template: `<div class="parent" style="width: 400px; height: 400px;">
        <vue-draggable-resizable :parent="true" :grid=[24,24] :x="10" :y="10" :w="360" :h="360" :active="true"></vue-draggable-resizable>
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
      const fromX = rect.left + rect.width / 2
      const fromY = rect.top + rect.height / 2

      syn.drag(
        $el,
        {
          from: { pageX: fromX, pageY: fromY },
          to: { pageX: fromX + 48, pageY: fromY + 48 },
          duration: 10
        },
        function () {
          expect($el.style.transform).to.equal('translate(34px, 34px)')

          done()
        }
      )
    })
  })

  it('should not resize the component outside the parent node when component has offset the grid is not an exact dividend of the parent size', function (done) {
    const ParentComponent = {
      template: `<div class="parent" style="width: 400px; height: 400px;">
        <vue-draggable-resizable :parent="true" :grid=[24,24] :x="10" :y="10" :w="360" :h="360" :active="true"></vue-draggable-resizable>
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
        $el.querySelector('div.handle-br'),
        {
          from: { pageX: fromX, pageY: fromY },
          to: { pageX: fromX + 50, pageY: fromY + 50 },
          duration: 10
        },
        function () {
          expect($el.style.width).to.equal('384px')
          expect($el.style.height).to.equal('384px')

          done()
        }
      )
    })
  })

  afterEach(() => wrapper.destroy())
})
