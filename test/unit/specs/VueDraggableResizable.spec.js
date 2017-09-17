import Vue from 'vue'
import VueDraggableResizable from '@/components/vue-draggable-resizable'
import { beforeEachHooks, afterEachHooks, mount, simulate } from 'vue-unit'
import Syn from 'syn'
import sinon from 'sinon'

function nextTick () {
  return new Promise((resolve, reject) => Vue.nextTick(resolve))
}

describe('VueDraggableResizable.vue', function () {
  beforeEach(beforeEachHooks)

  /***********
   * Generic *
   ***********/

  it('should render correctly', function () {
    const vm = mount(VueDraggableResizable)

    expect(vm.$el).to.be.ok
    expect(vm.$el.className).to.contain('vdr')
  })

  it('should render the elements in slot', function () {
    mount(VueDraggableResizable, {}, {}, '<p>Resize Me</p>')

    expect(document.querySelector('.vdr')).to.have.class('vdr')
    // cannot fully match the child element because vue injects a data-v-* random attribute
    expect(document.querySelector('.vdr')).to.contain.html('Resize Me</p>')
  })

  /****************************
   * Size and position prosps *
   ****************************/

  describe('Size and position props', function () {
    it('should set the size of the element through props', function () {
      const vm = mount(VueDraggableResizable, {
        w: 600,
        h: 500
      })

      expect(vm.$el.style.width).to.equal('600px')
      expect(vm.$el.style.height).to.equal('500px')
    })

    it('should costrain minimum width and height', function (done) {
      const vm = mount(VueDraggableResizable, {
        w: 100,
        h: 100,
        minw: 200,
        minh: 200
      })

      nextTick().then(function () {
        expect(vm.$el.style.width).to.equal('200px')
        expect(vm.$el.style.height).to.equal('200px')
        done()
      })
    })

    it('should not exceed the size of parent element if constrained', function (done) {
      const ParentComponent = {
        template: `<div class="parent" style="width: 500px; height: 500px;">
          <vue-draggable-resizable :w="600" :h="600" :parent="true">
            <p>Resize Me</p>
          </vue-draggable-resizable>
        </div>`,
        components: {
          VueDraggableResizable
        }
      }

      const vm = mount(ParentComponent)

      nextTick().then(function () {
        expect(vm.$children[0].style.width).to.equal('500px')
        expect(vm.$children[0].style.height).to.equal('500px')
        done()
      })
    })

    it('should set the position of the element through props', function () {
      const vm = mount(VueDraggableResizable, {
        x: 200,
        y: 150
      })

      expect(vm.$el.style.top).to.equal('150px')
      expect(vm.$el.style.left).to.equal('200px')
    })

    it('should not exceed the position of parent element if constrained', function (done) {
      const ParentComponent = {
        template: `<div class="parent" style="width: 500px; height: 500px;">
          <vue-draggable-resizable :x="400" :y="400" :w="200" :h="200" :parent="true">
            <p>Resize Me</p>
          </vue-draggable-resizable>
        </div>`,
        components: {
          VueDraggableResizable
        }
      }

      const vm = mount(ParentComponent)

      nextTick().then(function () {
        expect(vm.$children[0].style.width).to.equal('100px')
        expect(vm.$children[0].style.height).to.equal('100px')
        done()
      })
    })

    it('should emit resizing event when the component is mounted', function () {
      const resizing = sinon.spy()

      const vm = mount(VueDraggableResizable, {
        x: 50,
        y: 50,
        w: 200,
        h: 200
      }, {
        resizing
      })

      sinon.assert.calledWith(resizing, 50, 50, 200, 200)
    })
  })

  /***************
   * Active prop *
   ***************/

  describe('Active prop', function () {
    it('should enable the element through active prop', function () {
      const vm = mount(VueDraggableResizable, {
        active: true
      })

      expect(vm.$data.enabled).to.equal(true)
    })
  })

  /*******************
   * Clicking events *
   *******************/

  describe('Clicking events', function () {
    it('should activate the element by clicking on it', function () {
      const activated = sinon.spy()
      const update = sinon.spy()

      const vm = mount(VueDraggableResizable, {}, {
        activated,
        'update:active': update
      })

      simulate(vm.$el, 'mousedown')

      expect(vm.$data.enabled).to.equal(true)

      sinon.assert.calledWith(activated)
      sinon.assert.calledWith(update)
    })

    it('should show the handles if the element is active', function (done) {
      const vm = mount(VueDraggableResizable)

      simulate(vm.$el, 'mousedown')

      nextTick().then(function () {
        expect(vm.$el.querySelectorAll('div[style*="display: block"]')).to.have.length(8)
        done()
      })
    })

    it('should deactivate the element by clicking outside it', function () {
      const deactivated = sinon.spy()
      const update = sinon.spy()

      const vm = mount(VueDraggableResizable, {}, {
        deactivated,
        'update:active': update
      })

      simulate(vm.$el, 'mousedown')
      expect(vm.$data.enabled).to.equal(true)

      simulate(document.documentElement, 'mousedown')
      expect(vm.$data.enabled).to.equal(false)

      sinon.assert.calledWith(deactivated)
      sinon.assert.calledWith(update)
    })

    it('should emit "deactivated" event only once', function () {
      const deactivated = sinon.spy()

      const vm = mount(VueDraggableResizable, {}, { deactivated })

      simulate(vm.$el, 'mousedown')

      simulate(document.documentElement, 'mousedown')
      simulate(document.documentElement, 'mousedown')

      sinon.assert.calledOnce(deactivated)
    })
  })

  /*******************
   * Resizable props *
   *******************/

  describe('Resizable props', function () {
    it('should have "resizable" class by default', function () {
      const vm = mount(VueDraggableResizable)
      expect(vm.$el.className).to.contain('resizable')
    })

    it('should not have "resizable" class if resizable is disabled', function () {
      const vm = mount(VueDraggableResizable, {
        resizable: false
      })
      expect(vm.$el.className).to.not.contain('resizable')
    })

    it('should render eight handles not visible by default', function () {
      const vm = mount(VueDraggableResizable)
      expect(vm.$el.querySelectorAll('div.handle')).to.have.length(8)
      expect(vm.$el.querySelectorAll('div[style*="display:block"]')).to.have.length(0)
    })

    it('should not render handles if resizable is disabled', function () {
      const vm = mount(VueDraggableResizable, {
        resizable: false
      })
      expect(vm.$el.querySelectorAll('div.handle')).to.have.length(0)
    })

    it('should render only the handles passed with props', function () {
      const vm = mount(VueDraggableResizable, {
        handles: ['tl', 'tm', 'tr', 'bl', 'bm', 'br']
      })
      expect(vm.$el.querySelectorAll('div.handle')).to.have.length(6)
    })

    it('should not render the handles if handles props is empty', function () {
      const vm = mount(VueDraggableResizable, {
        handles: []
      })
      expect(vm.$el.querySelectorAll('div.handle')).to.have.length(0)
    })
  })

  /***********************
   * Resizable functions *
   ***********************/

  describe('Resizable functions', function () {
    it('should resize the element from the bottom right handle', function (done) {
      const vm = mount(VueDraggableResizable, {
        w: 100,
        h: 100
      })

      simulate(vm.$el, 'mousedown')

      nextTick().then(function () {
        const rect = vm.$el.querySelector('div.handle-br').getBoundingClientRect()
        const fromX = rect.left
        const fromY = rect.top

        vm.lastMouseX = fromX
        vm.lastMouseY = fromY

        Syn.drag(vm.$el.querySelector('div.handle-br'), {
          from: {pageX: fromX, pageY: fromY},
          to: {pageX: fromX + 10, pageY: fromY + 10}
        }, function () {
          expect(vm.$el.className).to.have.string('resizing')

          nextTick().then(function () {
            expect(vm.$el.style.width).to.equal('110px')
            expect(vm.$el.style.height).to.equal('110px')
            expect(vm.$data.resizing).to.equal(false)
            done()
          })
        })
      })
    })

    it('should resize the element from the top left handle', function (done) {
      const vm = mount(VueDraggableResizable, {
        x: 50,
        y: 50,
        w: 100,
        h: 100
      })

      simulate(vm.$el, 'mousedown')

      nextTick().then(function () {
        const rect = vm.$el.querySelector('div.handle-tl').getBoundingClientRect()
        const fromX = rect.left
        const fromY = rect.top

        vm.lastMouseX = fromX
        vm.lastMouseY = fromY

        Syn.drag(vm.$el.querySelector('div.handle-tl'), {
          from: {pageX: fromX, pageY: fromY},
          to: {pageX: fromX - 10, pageY: fromY - 10}
        }, function () {
          nextTick().then(function () {
            expect(vm.$el.style.top).to.equal('40px')
            expect(vm.$el.style.left).to.equal('40px')
            expect(vm.$el.style.width).to.equal('110px')
            expect(vm.$el.style.height).to.equal('110px')
            expect(vm.$data.resizing).to.equal(false)
            done()
          })
        })
      })
    })

    it('should emit "resizing" event while resizing the element', function (done) {
      const resizing = sinon.spy()

      const vm = mount(VueDraggableResizable, {
        w: 100,
        h: 100
      }, {
        resizing
      })

      simulate(vm.$el, 'mousedown')

      nextTick().then(function () {
        const rect = vm.$el.querySelector('div.handle-br').getBoundingClientRect()
        const fromX = rect.left
        const fromY = rect.top

        vm.lastMouseX = fromX
        vm.lastMouseY = fromY

        Syn.drag(vm.$el.querySelector('div.handle-br'), {
          from: {pageX: fromX, pageY: fromY},
          to: {pageX: fromX + 10, pageY: fromY + 10}
        }, function () {
          nextTick().then(function () {
            sinon.assert.calledWith(resizing, 0, 0, 110, 110)
            done()
          })
        })
      })
    })

    it('should emit "resizestop" event while stopping resizing the element', function (done) {
      const resizestop = sinon.spy()

      const vm = mount(VueDraggableResizable, {
        w: 100,
        h: 100
      }, {
        resizestop
      })

      simulate(vm.$el, 'mousedown')

      nextTick().then(function () {
        const rect = vm.$el.querySelector('div.handle-br').getBoundingClientRect()
        const fromX = rect.left
        const fromY = rect.top

        vm.lastMouseX = fromX
        vm.lastMouseY = fromY

        Syn.drag(vm.$el.querySelector('div.handle-br'), {
          from: {pageX: fromX, pageY: fromY},
          to: {pageX: fromX + 10, pageY: fromY + 10}
        }, function () {
          nextTick().then(function () {
            simulate(vm.$el, 'mouseup')
            nextTick().then(function () {
              sinon.assert.calledWith(resizestop, 0, 0, 110, 110)
              done()
            })
          })
        })
      })
    })
  })

  /*******************
   * Draggable props *
   *******************/

  describe('Draggable props', function () {
    it('should have "draggable" class by default', function () {
      const vm = mount(VueDraggableResizable)
      expect(vm.$el.className).to.contain('draggable')
    })

    it('should not have "draggable" class if draggable is disabled', function () {
      const vm = mount(VueDraggableResizable, {
        draggable: false
      })
      expect(vm.$el.className).to.not.contain('draggable')
    })
  })

  /********************
   * Draggable events *
   ********************/

  describe('Draggable events', function () {
    it('should activate dragging on an element by clicking it', function () {
      const vm = mount(VueDraggableResizable)

      simulate(vm.$el, 'mousedown')

      expect(vm.dragging).to.be.true
    })
  })

  /***********************
   * Draggable functions *
   ***********************/

  describe('Draggable functions', function () {
    it('should drag the element', function (done) {
      const vm = mount(VueDraggableResizable, {
        w: 100,
        h: 100
      })

      simulate(vm.$el, 'mousedown')

      nextTick().then(function () {
        vm.lastMouseX = 50
        vm.lastMouseY = 50

        Syn.drag(vm.$el, {
          from: {pageX: 50, pageY: 50},
          to: {pageX: 60, pageY: 60}
        }, function () {
          expect(vm.$el.className).to.have.string('dragging')

          nextTick().then(function () {
            expect(vm.$el.style.top).to.equal('10px')
            expect(vm.$el.style.left).to.equal('10px')
            expect(vm.$data.dragging).to.equal(false)
            done()
          })
        })
      })
    })

    it('should emit "dragging" event while dragging the element', function (done) {
      const dragging = sinon.spy()

      const vm = mount(VueDraggableResizable, {
        w: 100,
        h: 100
      }, {
        dragging
      })

      simulate(vm.$el, 'mousedown')

      nextTick().then(function () {
        vm.lastMouseX = 50
        vm.lastMouseY = 50

        Syn.drag(vm.$el, {
          from: {pageX: 50, pageY: 50},
          to: {pageX: 60, pageY: 60}
        }, function () {
          nextTick().then(function () {
            sinon.assert.calledWith(dragging, 10, 10)
            done()
          })
        })
      })
    })

    it('should emit "dragstop" event while stopping dragging the element', function (done) {
      const dragstop = sinon.spy()

      const vm = mount(VueDraggableResizable, {
        w: 100,
        h: 100
      }, {
        dragstop
      })

      simulate(vm.$el, 'mousedown')

      nextTick().then(function () {
        vm.lastMouseX = 50
        vm.lastMouseY = 50

        Syn.drag(vm.$el, {
          from: {pageX: 50, pageY: 50},
          to: {pageX: 60, pageY: 60}
        }, function () {
          nextTick().then(function () {
            simulate(vm.$el, 'mouseup')
            nextTick().then(function () {
              sinon.assert.calledWith(dragstop, 10, 10)
              done()
            })
          })
        })
      })
    })
  })

  /*************************
   * Double click function *
   *************************/

  describe('Double click function', function () {
    it('should not maximize the element if parent prop is false', function (done) {
      const resizing = sinon.spy()

      const vm = mount(VueDraggableResizable, {
        x: 10,
        y: 10,
        w: 100,
        h: 100,
        parent: false,
        maximize: true
      }, {
        resizing
      })

      simulate(vm.$el, 'dblclick')

      nextTick().then(function () {
        sinon.assert.calledOnce(resizing)
        expect(vm.$el.style.top).to.equal('10px')
        expect(vm.$el.style.left).to.equal('10px')
        expect(vm.$el.style.width).to.equal('100px')
        expect(vm.$el.style.height).to.equal('100px')
        done()
      })
    })

    it('should not maximize the element if maximize prop is false', function (done) {
      const resizing = sinon.spy()

      const vm = mount(VueDraggableResizable, {
        x: 10,
        y: 10,
        w: 100,
        h: 100,
        parent: true,
        maximize: false
      }, {
        resizing
      })

      simulate(vm.$el, 'dblclick')

      nextTick().then(function () {
        sinon.assert.calledOnce(resizing)
        expect(vm.$el.style.top).to.equal('10px')
        expect(vm.$el.style.left).to.equal('10px')
        expect(vm.$el.style.width).to.equal('100px')
        expect(vm.$el.style.height).to.equal('100px')
        done()
      })
    })
  })

  afterEach(afterEachHooks)
})
