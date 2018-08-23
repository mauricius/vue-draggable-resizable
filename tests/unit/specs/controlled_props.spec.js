import Vue from 'vue'
import VueDraggableResizable from '@/components/vue-draggable-resizable'
import { mount } from '@vue/test-utils'
import syn from 'syn'

let wrapper

describe('controlled props', function () {
  /******************
   * Position props *
   ******************/
  describe('position props', function () {
    it('should set the position of the element through props', function () {
      wrapper = mount(VueDraggableResizable, {
        propsData: {
          x: 200,
          y: 150
        }
      })

      expect(wrapper.props().x).to.equal(200)
      expect(wrapper.props().y).to.equal(150)

      expect(wrapper.vm.$el.style.top).to.equal('150px')
      expect(wrapper.vm.$el.style.left).to.equal('200px')
    })

    it('should react to position prop changes', function () {
      wrapper = mount(VueDraggableResizable, {
        propsData: {
          x: 200,
          y: 150
        }
      })

      wrapper.setProps({ x: 250, y: 200 })

      expect(wrapper.vm.$el.style.top).to.equal('200px')
      expect(wrapper.vm.$el.style.left).to.equal('250px')
    })
  })

  /**************
   * Size props *
   **************/
  describe('size props', function () {
    it('should set the size of the element through props', function (done) {
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
  })

  afterEach(() => wrapper.destroy())
})
