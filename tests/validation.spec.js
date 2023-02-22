import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'
import { mount } from '@vue/test-utils'
import { describe, it, expect, afterEach, beforeEach } from 'vitest'

let wrapper

const getProp = (prop) => {
  return wrapper.vm.$options.props[prop]
}

describe('props validation', () => {

  beforeEach(() => {
    wrapper = mount(VueDraggableResizable)
  })

  it('should validate `className` prop', () => {
    const className = getProp('className')

    expect(className.required).to.be.undefined
    expect(className.type).to.equal(String)
    expect(className.default).to.equal('vdr')
  })

  it('should validate `classNameDraggable` prop', () => {
    const classNameDraggable = getProp('classNameDraggable')

    expect(classNameDraggable.required).to.be.undefined
    expect(classNameDraggable.type).to.equal(String)
    expect(classNameDraggable.default).to.equal('draggable')
  })

  it('should validate `classNameResizable` prop', () => {
    const classNameResizable = getProp('classNameResizable')

    expect(classNameResizable.required).to.be.undefined
    expect(classNameResizable.type).to.equal(String)
    expect(classNameResizable.default).to.equal('resizable')
  })

  it('should validate `classNameDragging` prop', () => {
    const classNameDragging = getProp('classNameDragging')

    expect(classNameDragging.required).to.be.undefined
    expect(classNameDragging.type).to.equal(String)
    expect(classNameDragging.default).to.equal('dragging')
  })

  it('should validate `classNameResizing` prop', () => {
    const classNameResizing = getProp('classNameResizing')

    expect(classNameResizing.required).to.be.undefined
    expect(classNameResizing.type).to.equal(String)
    expect(classNameResizing.default).to.equal('resizing')
  })

  it('should validate `classNameActive` prop', () => {
    const classNameActive = getProp('classNameActive')

    expect(classNameActive.required).to.be.undefined
    expect(classNameActive.type).to.equal(String)
    expect(classNameActive.default).to.equal('active')
  })

  it('should validate `classNameHandle` prop', () => {
    const classNameHandle = getProp('classNameHandle')

    expect(classNameHandle.required).to.be.undefined
    expect(classNameHandle.type).to.equal(String)
    expect(classNameHandle.default).to.equal('handle')
  })

  it('should validate `disableUserSelect` prop', () => {
    const disableUserSelect = getProp('disableUserSelect')

    expect(disableUserSelect.required).to.be.undefined
    expect(disableUserSelect.type).to.equal(Boolean)
    expect(disableUserSelect.default).to.be.true
  })

  it('should validate `enableNativeDrag` prop', () => {
    const enableNativeDrag = getProp('enableNativeDrag')

    expect(enableNativeDrag.required).to.be.undefined
    expect(enableNativeDrag.type).to.equal(Boolean)
    expect(enableNativeDrag.default).to.be.false
  })

  it('should validate `preventDeactivation` prop', () => {
    const preventDeactivation = getProp('preventDeactivation')

    expect(preventDeactivation.required).to.be.undefined
    expect(preventDeactivation.type).to.equal(Boolean)
    expect(preventDeactivation.default).to.be.false
  })

  it('should validate `active` prop', () => {
    const active = getProp('active')

    expect(active.required).to.be.undefined
    expect(active.type).to.equal(Boolean)
    expect(active.default).to.be.false
  })

  it('should validate `draggable` prop', () => {
    const draggable = getProp('draggable')

    expect(draggable.required).to.be.undefined
    expect(draggable.type).to.equal(Boolean)
    expect(draggable.default).to.be.true
  })

  it('should validate `resizable` prop', () => {
    const resizable = getProp('resizable')

    expect(resizable.required).to.be.undefined
    expect(resizable.type).to.equal(Boolean)
    expect(resizable.default).to.be.true
  })

  it('should validate `lockAspectRatio` prop', () => {
    const lockAspectRatio = getProp('lockAspectRatio')

    expect(lockAspectRatio.required).to.be.undefined
    expect(lockAspectRatio.type).to.equal(Boolean)
    expect(lockAspectRatio.default).to.be.false
  })

  it('should validate `w` prop', () => {
    const w = getProp('w')

    expect(w.required).to.be.undefined
    expect(w.type).to.contain(String)
    expect(w.type).to.contain(Number)
    expect(w.validator('auto')).to.be.true
    expect(w.validator(200)).to.be.true
    expect(w.validator('random')).to.be.false
    expect(w.validator(-200)).to.be.false
  })

  it('should validate `h` prop', () => {
    const h = getProp('w')

    expect(h.required).to.be.undefined
    expect(h.type).to.contain(String)
    expect(h.type).to.contain(Number)
    expect(h.validator('auto')).to.be.true
    expect(h.validator(200)).to.be.true
    expect(h.validator('random')).to.be.false
    expect(h.validator(-200)).to.be.false
  })

  it('should validate `minWidth` prop', () => {
    const minWidth = getProp('minWidth')

    expect(minWidth.required).to.be.undefined
    expect(minWidth.type).to.equal(Number)
    expect(minWidth.default).to.equal(0)
    expect(minWidth.validator(1)).to.be.true
    expect(minWidth.validator(-1)).to.be.false
  })

  it('should validate `minHeight` prop', () => {
    const minHeight = getProp('minHeight')

    expect(minHeight.required).to.be.undefined
    expect(minHeight.type).to.equal(Number)
    expect(minHeight.default).to.equal(0)
    expect(minHeight.validator(1)).to.be.true
    expect(minHeight.validator(-1)).to.be.false
  })

  it('should validate `maxWidth` prop', () => {
    const maxWidth = getProp('maxWidth')

    expect(maxWidth.required).to.be.undefined
    expect(maxWidth.type).to.equal(Number)
    expect(maxWidth.default).to.be.null
    expect(maxWidth.validator(1)).to.be.true
    expect(maxWidth.validator(-1)).to.be.false
  })

  it('should validate `maxHeight` prop', () => {
    const maxHeight = getProp('maxHeight')

    expect(maxHeight.required).to.be.undefined
    expect(maxHeight.type).to.equal(Number)
    expect(maxHeight.default).to.be.null
    expect(maxHeight.validator(1)).to.be.true
    expect(maxHeight.validator(-1)).to.be.false
  })

  it('should validate `x` prop', () => {
    const x = getProp('x')

    expect(x.required).to.be.undefined
    expect(x.type).to.equal(Number)
    expect(x.default).to.equal(0)
  })

  it('should validate `y` prop', () => {
    const y = getProp('y')

    expect(y.required).to.be.undefined
    expect(y.type).to.equal(Number)
    expect(y.default).to.equal(0)
  })

  it('should validate `z` prop', () => {
    const z = getProp('z')

    expect(z.required).to.be.undefined
    expect(z.type).to.contain(String)
    expect(z.type).to.contain(Number)
    expect(z.default).to.equal('auto')
    expect(z.validator(1)).to.be.true
    expect(z.validator(-1)).to.be.false
    expect(z.validator('auto')).to.be.true
    expect(z.validator('test')).to.be.false
  })

  it('should validate `handles` prop', () => {
    const handles = getProp('handles')

    expect(handles.required).to.be.undefined
    expect(handles.type).to.equal(Array)
    expect(handles.default()).to.deep.equal(['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'])
    expect(handles.validator([])).to.be.true
    expect(handles.validator(['cc', 'pp'])).to.be.false
  })

  it('should validate `dragHandle` prop', () => {
    const dragHandle = getProp('dragHandle')

    expect(dragHandle.required).to.be.undefined
    expect(dragHandle.type).to.equal(String)
    expect(dragHandle.default).to.be.null
  })

  it('should validate `dragCancel` prop', () => {
    const dragCancel = getProp('dragCancel')

    expect(dragCancel.required).to.be.undefined
    expect(dragCancel.type).to.equal(String)
    expect(dragCancel.default).to.be.null
  })

  it('should validate `axis` prop', () => {
    const axis = getProp('axis')

    expect(axis.required).to.be.undefined
    expect(axis.type).to.equal(String)
    expect(axis.default).to.equal('both')
    expect(axis.validator('x')).to.be.true
    expect(axis.validator('y')).to.be.true
    expect(axis.validator('both')).to.be.true
    expect(axis.validator('test')).to.be.false
  })

  it('should validate `grid` prop', () => {
    const grid = getProp('grid')

    expect(grid.required).to.be.undefined
    expect(grid.type).to.equal(Array)
    expect(grid.default()).to.deep.equal([1, 1])
  })

  it('should validate `parent` prop', () => {
    const parent = getProp('parent')

    expect(parent.required).to.be.undefined
    expect(parent.type).to.equal(Boolean)
    expect(parent.default).to.equal(false)
  })

  it('should validate `scale` prop', () => {
    const scale = getProp('scale')

    expect(scale.required).to.be.undefined
    expect(scale.type).to.contain(Number)
    expect(scale.type).to.contain(Array)
    expect(scale.default).to.equal(1)
    expect(scale.validator(1)).to.be.true
    expect(scale.validator([0.5, 0.4])).to.be.true
    expect(scale.validator(0)).to.be.false
    expect(scale.validator(-1)).to.be.false
    expect(scale.validator([0, 0])).to.be.false
    expect(scale.validator([-1, -1])).to.be.false
    expect(scale.validator([1, 1, 1])).to.be.false
  })

  it('should validate `onDragStart` prop', () => {
    const onDragStart = getProp('onDragStart')

    expect(onDragStart.required).to.be.undefined
    expect(onDragStart.type).to.equal(Function)
    expect(onDragStart.default()).to.equal(true)
  })

  it('should validate `onDrag` prop', () => {
    const onDrag = getProp('onDrag')

    expect(onDrag.required).to.be.undefined
    expect(onDrag.type).to.equal(Function)
    expect(onDrag.default()).to.equal(true)
  })

  it('should validate `onResizeStart` prop', () => {
    const onResizeStart = getProp('onResizeStart')

    expect(onResizeStart.required).to.be.undefined
    expect(onResizeStart.type).to.equal(Function)
    expect(onResizeStart.default()).to.equal(true)
  })

  it('should validate `onResize` prop', () => {
    const onResize = getProp('onResize')

    expect(onResize.required).to.be.undefined
    expect(onResize.type).to.equal(Function)
    expect(onResize.default()).to.equal(true)
  })

  afterEach(() => wrapper.unmount())
})
