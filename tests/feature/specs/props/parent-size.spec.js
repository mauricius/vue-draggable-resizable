import VueDraggableResizable from '@/components/vue-draggable-resizable'
import { mount, createWrapper } from '@vue/test-utils'
import div from '../../div'

let parent
let wrapper

describe('`parent` and `size` props', function () {
  it('should set the component size outside the parent node if `parent` prop is false', async function () {
    const ParentComponent = {
      template: `<div class="parent" style="width: 200px; height: 200px;">
        <vue-draggable-resizable :x="0" :y="0" :w="200" :h="200" :parent="false" :active="true"></vue-draggable-resizable>
      </div>`,
      components: {
        VueDraggableResizable
      }
    }

    parent = mount(ParentComponent, {
      attachTo: div()
    })

    wrapper = createWrapper(parent.vm.$children[0])

    await wrapper.setProps({ w: 300, h: 300 })

    const $el = wrapper.vm.$el

    expect($el.style.transform).to.equal('translate(0px, 0px)')
    expect($el.style.width).to.equal('300px')
    expect($el.style.height).to.equal('300px')
  })

  it('should not set the component size outside the parent node if `parent` prop is true', async function () {
    const ParentComponent = {
      template: `<div class="parent" style="width: 200px; height: 200px;">
        <vue-draggable-resizable :x="0" :y="0" :w="200" :h="200" :parent="true" :active="true"></vue-draggable-resizable>
      </div>`,
      components: {
        VueDraggableResizable
      }
    }

    parent = mount(ParentComponent, {
      attachTo: div()
    })

    wrapper = createWrapper(parent.vm.$children[0])

    await wrapper.setProps({ w: 300, h: 300 })

    const $el = wrapper.vm.$el

    expect($el.style.transform).to.equal('translate(0px, 0px)')
    expect($el.style.width).to.equal('200px')
    expect($el.style.height).to.equal('200px')
  })

  afterEach(() => {
    wrapper.destroy()
    parent.destroy()
  })
})
