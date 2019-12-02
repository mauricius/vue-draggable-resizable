import VueDraggableResizable from '@/components/vue-draggable-resizable'
import { mount } from '@vue/test-utils'
import syn from 'syn'
import sinon from 'sinon'

let wrapper

describe('basic props', function () {
  /********************************
   * minHeight and minWidth props *
   ********************************/

  describe('minHeight and minWidth props', function () {
    it('should pass minHeight and minWidth as props', function () {
      wrapper = mount(VueDraggableResizable, {
        propsData: {
          minHeight: 100,
          minWidth: 200
        }
      })

      expect(wrapper.props().minHeight).to.equal(100)
      expect(wrapper.props().minWidth).to.equal(200)
    })

    it('should react to minHeight and minWidth prop changes', function () {
      wrapper = mount(VueDraggableResizable, {
        attachToDocument: true,
        propsData: {
          minHeight: 100,
          minWidth: 200
        }
      })

      wrapper.setProps({ minHeight: 200, minWidth: 300 })

      expect(wrapper.props().minHeight).to.equal(200)
      expect(wrapper.props().minWidth).to.equal(300)
    })

    it('should not resize the component under minHeight and minWidth', function (done) {
      wrapper = mount(VueDraggableResizable, {
        attachToDocument: true,
        propsData: {
          minHeight: 100,
          minWidth: 100,
          w: 100,
          h: 100,
          active: true
        }
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
            to: { pageX: fromX - 50, pageY: fromY - 50 }
          },
          function () {
            expect($el.style.width).to.equal('100px')
            expect($el.style.height).to.equal('100px')

            done()
          }
        )
      })
    })
  })

  /***************
   * Active prop *
   ***************/

  describe('active prop', function () {
    it('should enable the element through active prop', function () {
      wrapper = mount(VueDraggableResizable, {
        propsData: {
          active: true
        }
      })

      expect(wrapper.props().active).to.be.true
      expect(wrapper.classes()).to.contain('active')
    })

    it('should not show handles if the element is not active', function () {
      wrapper = mount(VueDraggableResizable, {
        propsData: {
          active: false
        }
      })

      expect(wrapper.find('div.handle').isVisible()).to.be.false
    })

    it('should show handles if the element is active', function () {
      wrapper = mount(VueDraggableResizable, {
        propsData: {
          active: false
        }
      })

      wrapper.setProps({ active: true })

      expect(wrapper.find('div.handle').isVisible()).to.be.true
    })

    it('should resize the component also when it is activated using prop', function (done) {
      wrapper = mount(VueDraggableResizable, {
        attachToDocument: true,
        propsData: {
          w: 100,
          h: 100,
          active: false
        }
      })

      wrapper.setProps({ active: true })

      wrapper.vm.$nextTick().then(function () {
        const $el = wrapper.vm.$el
        const rect = $el.querySelector('div.handle-br').getBoundingClientRect()
        const fromX = rect.left
        const fromY = rect.top

        syn.drag(
          $el.querySelector('div.handle-br'),
          {
            from: { pageX: fromX, pageY: fromY },
            to: { pageX: fromX + 10, pageY: fromY + 10 }
          },
          function () {
            expect(wrapper.emitted()).to.have.property('resizing')
            expect(wrapper.emitted().resizing.pop()).to.deep.equal([0, 0, 110, 110])

            done()
          }
        )
      })
    })

    it('should activate the component when clicking on it', function (done) {
      wrapper = mount(VueDraggableResizable, {
        attachToDocument: true
      })

      wrapper.vm.$nextTick(() => {
        wrapper.trigger('mousedown')

        expect(wrapper.emitted()).to.have.property('activated')
        expect(wrapper.emitted()).to.have.property('update:active')

        done()
      })
    })

    it('should deactivate the component when clicking outside it', function (done) {
      wrapper = mount(VueDraggableResizable, {
        attachToDocument: true,
        propsData: {
          active: true
        }
      })

      syn.click(document.documentElement)

      wrapper.vm.$nextTick(() => {
        expect(wrapper.classes()).to.not.contain('active')
        expect(wrapper.emitted()).to.have.property('deactivated')
        expect(wrapper.emitted()).to.have.property('update:active')

        done()
      })
    })
  })

  /*****************************
   * Prevent Deactivation prop *
   *****************************/

  describe('prevent deactivation prop', function () {
    it('should not deactivate the component when clicking outside it', function (done) {
      wrapper = mount(VueDraggableResizable, {
        attachToDocument: true,
        propsData: {
          active: true,
          preventDeactivation: true
        }
      })

      expect(wrapper.props().preventDeactivation).to.be.true

      syn.click(document.documentElement)

      wrapper.vm.$nextTick(() => {
        expect(wrapper.props().active).to.be.true
        expect(wrapper.emitted()).to.not.have.property('deactivated')

        done()
      })
    })
  })

  /*******************
   * Draggable props *
   *******************/

  describe('component draggable', function () {
    it('should have "draggable" class by default', function () {
      wrapper = mount(VueDraggableResizable)

      expect(wrapper.classes()).to.contain('draggable')
    })

    it('should not have "draggable" class if the draggable prop is false', function (done) {
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

    it('should react to draggable prop changes', function () {
      wrapper = mount(VueDraggableResizable, {
        attachToDocument: true,
        propsData: {
          draggable: false
        }
      })

      wrapper.setProps({ draggable: true })

      expect(wrapper.classes()).to.contain('draggable')
    })

    it('should not be draggable if draggable prop is false', function (done) {
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
            to: { pageX: fromX + 100, pageY: fromY + 100 }
          },
          function () {
            expect($el.style.top).to.equal('0px')
            expect($el.style.left).to.equal('0px')

            done()
          }
        )
      })
    })
  })

  /*******************
   * Resizable props *
   *******************/

  describe('component resizable', function () {
    it('should have "resizable" class by default', function () {
      wrapper = mount(VueDraggableResizable)

      expect(wrapper.classes()).to.contain('resizable')
    })

    it('should not have "resizable" class if the resizable prop is false', function (done) {
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

    it('should not have handles if the resizable prop is false', function () {
      wrapper = mount(VueDraggableResizable, {
        attachToDocument: true,
        propsData: {
          active: true,
          resizable: false
        }
      })

      expect(wrapper.findAll('div.handle').length).to.equal(0)
    })

    it('should react to resizable prop changes', function () {
      wrapper = mount(VueDraggableResizable, {
        attachToDocument: true,
        propsData: {
          resizable: false
        }
      })

      wrapper.setProps({ resizable: true })

      expect(wrapper.classes()).to.contain('resizable')
    })

    it('should render only the handles passed with handles props', function () {
      wrapper = mount(VueDraggableResizable, {
        propsData: {
          handles: ['tl', 'tm', 'tr', 'bl', 'bm', 'br']
        }
      })

      expect(wrapper.props().handles).to.have.length(6)
      expect(wrapper.findAll('div.handle').length).to.equal(6)
    })

    it('should not render the handles if handles props is empty', function () {
      wrapper = mount(VueDraggableResizable, {
        propsData: {
          handles: []
        }
      })

      expect(wrapper.findAll('div.handle').length).to.equal(0)
    })

    it('should react to handles prop changes', function () {
      wrapper = mount(VueDraggableResizable, {
        attachToDocument: true,
        propsData: {
          handles: []
        }
      })

      wrapper.setProps({ handles: ['tl', 'tm', 'tr', 'bl', 'bm', 'br'] })

      expect(wrapper.props().handles).to.have.length(6)
      expect(wrapper.findAll('div.handle').length).to.equal(6)
    })
  })

  /************************
   * enableNativDrag prop *
   ************************/

  describe('native drag', function () {
    it('should enable native drag by passing true to prop', function () {
      wrapper = mount(VueDraggableResizable, {
        attachToDocument: true,
        propsData: {
          enableNativeDrag: true
        }
      })

      expect(wrapper.props().enableNativeDrag).to.be.true
    })
  })

  /***************
   * zIndex prop *
   ***************/

  describe('zIndex prop', function () {
    it('should set the zIndex throug z prop', function () {
      wrapper = mount(VueDraggableResizable, {
        attachToDocument: true,
        propsData: {
          z: 99
        }
      })

      expect(wrapper.props().z).to.equal(99)
      expect(wrapper.vm.$el.style.zIndex).to.equal('99')
    })

    it('should set "auto" as defaul value for zIndex if prop is not provided', function () {
      wrapper = mount(VueDraggableResizable)

      expect(wrapper.vm.$el.style.zIndex).to.equal('auto')
    })

    it('should react to z prop changes', function () {
      wrapper = mount(VueDraggableResizable, {
        attachToDocument: true,
        propsData: {
          z: 99
        }
      })

      wrapper.setProps({ z: 999 })

      expect(wrapper.vm.$data.zIndex).to.equal(999)
    })
  })

  /*******************
   * dragHandle prop *
   *******************/

  describe('drag handle prop', function () {
    it('should activate the component only from the provided handle', function () {
      wrapper = mount(VueDraggableResizable, {
        attachToDocument: true,
        propsData: {
          dragHandle: '.drag-handle'
        },
        slots: {
          default: '<div class="drag-handle">Drag only me</div>'
        }
      })

      wrapper.find('.drag-handle').trigger('mousedown')

      expect(wrapper.emitted()).to.have.property('activated')
      expect(wrapper.emitted()).to.have.property('update:active')
    })

    it('should not activate the component from outside the provided handle', function () {
      wrapper = mount(VueDraggableResizable, {
        attachToDocument: true,
        propsData: {
          dragHandle: '.drag-handle'
        },
        slots: {
          default: '<div class="drag-handle">Drag only me</div>'
        }
      })

      wrapper.trigger('mousedown')

      expect(wrapper.emitted()).to.not.have.property('activated')
      expect(wrapper.emitted()).to.not.have.property('update:active')
    })

    it('should drag the component only from the provided handle', function (done) {
      wrapper = mount(VueDraggableResizable, {
        attachToDocument: true,
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

      wrapper.vm.$nextTick(() => {
        const $el = wrapper.vm.$el

        const rect = $el.querySelector('.drag-handle').getBoundingClientRect()
        const fromX = rect.left
        const fromY = rect.top

        syn.drag(
          $el.querySelector('.drag-handle'),
          {
            from: { pageX: fromX, pageY: fromY },
            to: { pageX: fromX + 100, pageY: fromY + 100 }
          },
          function () {
            expect($el.style.top).to.equal('100px')
            expect($el.style.left).to.equal('100px')

            done()
          }
        )
      })
    })
  })

  /*******************
   * dragCancel prop *
   *******************/
  describe('drag cancel prop', function () {
    it('should not activate the component from the provided handle', function () {
      wrapper = mount(VueDraggableResizable, {
        attachToDocument: true,
        propsData: {
          dragCancel: '.drag-cancel'
        },
        slots: {
          default: '<div class="drag-cancel">Drag is not allowed here</div>'
        }
      })

      wrapper.find('.drag-cancel').trigger('mousedown')

      expect(wrapper.emitted()).to.not.have.property('activated')
      expect(wrapper.emitted()).to.not.have.property('update:active')
    })

    it('should activate the component from outside the provided handle', function () {
      wrapper = mount(VueDraggableResizable, {
        attachToDocument: true,
        propsData: {
          dragCancel: '.drag-cancel'
        },
        slots: {
          default: '<div class="drag-cancel">Drag is not allowed here</div>'
        }
      })

      wrapper.trigger('mousedown')

      expect(wrapper.emitted()).to.have.property('activated')
      expect(wrapper.emitted()).to.have.property('update:active')
    })
  })

  /*************
   * axis prop *
   *************/
  describe('draggable axis prop', function () {
    it('should provided the draggable axis prop', function () {
      wrapper = mount(VueDraggableResizable, {
        attachToDocument: true,
        propsData: {
          axis: 'x'
        }
      })

      expect(wrapper.props().axis).to.equal('x')
    })

    it('should effectively drag the component only on the provided axis', function (done) {
      wrapper = mount(VueDraggableResizable, {
        attachToDocument: true,
        propsData: {
          axis: 'x',
          x: 0,
          y: 0,
          w: 100,
          h: 100
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
            to: { pageX: fromX + 100, pageY: fromY + 20 }
          },
          function () {
            expect($el.style.top).to.equal('0px')
            expect($el.style.left).to.equal('100px')

            done()
          }
        )
      })
    })
  })

  /********************************
   * maxWidth and maxHeight props *
   ********************************/

  describe('maxWidth and maxHeight props', function () {
    it('should pass maxWidth and maxHeight as props', function () {
      wrapper = mount(VueDraggableResizable, {
        propsData: {
          maxWidth: 200,
          maxHeight: 300
        }
      })

      expect(wrapper.props().maxWidth).to.equal(200)
      expect(wrapper.props().maxHeight).to.equal(300)
    })

    it('should react to maxWidth and maxHeight prop changes', function () {
      wrapper = mount(VueDraggableResizable, {
        attachToDocument: true,
        propsData: {
          maxWidth: 200,
          maxHeight: 300
        }
      })

      wrapper.setProps({ maxWidth: 300, maxHeight: 200 })

      expect(wrapper.props().maxWidth).to.equal(300)
      expect(wrapper.props().maxHeight).to.equal(200)
    })

    it('should not resize the component over maxWidth and maxHeight', function (done) {
      wrapper = mount(VueDraggableResizable, {
        attachToDocument: true,
        propsData: {
          maxWidth: 100,
          maxHeight: 100,
          w: 100,
          h: 100,
          active: true
        }
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
            to: { pageX: fromX + 50, pageY: fromY + 50 }
          },
          function () {
            expect($el.style.width).to.equal('100px')
            expect($el.style.height).to.equal('100px')

            done()
          }
        )
      })
    })
  })

  /*********************************
   * onDragStart and onResizeStart *
   *********************************/

  describe('onDragStart and onResizeStart props', function () {
    it('should call onDragStart callback when the component is clicked', function () {
      const onDragStartCallback = sinon.spy()

      wrapper = mount(VueDraggableResizable, {
        attachToDocument: true,
        propsData: {
          onDragStart: onDragStartCallback
        }
      })

      wrapper.trigger('mousedown')

      sinon.assert.called(onDragStartCallback)
    })

    it('should call onResizeStart callback when the component is resized', function (done) {
      const onResizeStartCallback = sinon.spy()

      wrapper = mount(VueDraggableResizable, {
        attachToDocument: true,
        propsData: {
          active: true,
          onResizeStart: onResizeStartCallback
        }
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
            to: { pageX: fromX + 50, pageY: fromY + 50 }
          },
          function () {
            sinon.assert.called(onResizeStartCallback)

            done()
          }
        )
      })
    })
  })

  /*********
   * scale *
   *********/

  describe('scale prop', function () {
    it('should drag the component accordingly to its scale property', function (done) {
      const ParentComponent = {
        template: `<div>
          <vue-draggable-resizable :x="0" :y="0" :scale="0.5" :active="true"></vue-draggable-resizable>
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
            to: { pageX: fromX + 50, pageY: fromY + 50 }
          },
          function () {
            expect($el.style.top).to.equal('100px')
            expect($el.style.left).to.equal('100px')

            done()
          }
        )
      })
    })

    it('should call resize the component accordingly to its scale property', function (done) {
      const ParentComponent = {
        template: `<div>
          <vue-draggable-resizable :x="0" :y="0" :width="200" :height="200" :scale="1.5" :active="true"></vue-draggable-resizable>
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
            to: { pageX: fromX + 50, pageY: fromY + 50 }
          },
          function () {
            expect($el.style.width).to.equal('233px')
            expect($el.style.height).to.equal('233px')

            done()
          }
        )
      })
    })
  })

  afterEach(() => wrapper.destroy())
})
