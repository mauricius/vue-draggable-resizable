import VueDraggableResizable from '@/components/vue-draggable-resizable'
import { mount, createWrapper } from '@vue/test-utils'

let parent
let wrapper

describe('`parent` and `position` props', function () {
  it('should set the component position outside the parent node if `parent` prop is false', function (done) {
    const ParentComponent = {
      template: `<div class="parent" style="width: 200px; height: 200px;">
        <vue-draggable-resizable :x="0" :y="0" :w="200" :h="200" :parent="false" :active="true"></vue-draggable-resizable>
      </div>`,
      components: {
        VueDraggableResizable
      }
    }

    parent = mount(ParentComponent, {
      attachToDocument: true
    })

    wrapper = createWrapper(parent.vm.$children[0])

    wrapper.setProps({ x: 100, y: 100 })

    wrapper.vm.$nextTick(() => {
      const $el = wrapper.vm.$el

      expect($el.style.transform).to.equal('translate(100px, 100px)')
      expect($el.style.width).to.equal('200px')
      expect($el.style.height).to.equal('200px')

      done()
    })
  })

  it('should not set the component position outside the parent node if `parent` prop is true', function (done) {
    const ParentComponent = {
      template: `<div class="parent" style="width: 200px; height: 200px;">
        <vue-draggable-resizable :x="0" :y="0" :w="200" :h="200" :parent="true" :active="true"></vue-draggable-resizable>
      </div>`,
      components: {
        VueDraggableResizable
      }
    }

    parent = mount(ParentComponent, {
      attachToDocument: true
    })

    wrapper = createWrapper(parent.vm.$children[0])

    wrapper.setProps({ x: 100, y: 100 })

    wrapper.vm.$nextTick(() => {
      const $el = wrapper.vm.$el

      expect($el.style.transform).to.equal('translate(0px, 0px)')
      expect($el.style.width).to.equal('200px')
      expect($el.style.height).to.equal('200px')

      done()
    })
  })

  afterEach(() => {
    wrapper.destroy()
    parent.destroy()
  })
})
