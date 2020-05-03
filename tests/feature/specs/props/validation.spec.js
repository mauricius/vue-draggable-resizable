import VueDraggableResizable from '@/components/vue-draggable-resizable'
import { mount } from '@vue/test-utils'

let wrapper

function getProp (prop) {
  return wrapper.vm.$options.props[prop]
}

describe('props validation', function () {
  beforeEach(() => {
    wrapper = mount(VueDraggableResizable)
  })

  it('should validate `className` prop', function () {
    const className = getProp('className')

    expect(className.required).to.be.undefined
    expect(className.type).to.equal(String)
    expect(className.default).to.equal('vdr')
  })

  it('should validate `classNameDraggable` prop', function () {
    const classNameDraggable = getProp('classNameDraggable')

    expect(classNameDraggable.required).to.be.undefined
    expect(classNameDraggable.type).to.equal(String)
    expect(classNameDraggable.default).to.equal('draggable')
  })

  it('should validate `classNameResizable` prop', function () {
    const classNameResizable = getProp('classNameResizable')

    expect(classNameResizable.required).to.be.undefined
    expect(classNameResizable.type).to.equal(String)
    expect(classNameResizable.default).to.equal('resizable')
  })

  it('should validate `classNameDragging` prop', function () {
    const classNameDragging = getProp('classNameDragging')

    expect(classNameDragging.required).to.be.undefined
    expect(classNameDragging.type).to.equal(String)
    expect(classNameDragging.default).to.equal('dragging')
  })

  it('should validate `classNameResizing` prop', function () {
    const classNameResizing = getProp('classNameResizing')

    expect(classNameResizing.required).to.be.undefined
    expect(classNameResizing.type).to.equal(String)
    expect(classNameResizing.default).to.equal('resizing')
  })

  it('should validate `classNameActive` prop', function () {
    const classNameActive = getProp('classNameActive')

    expect(classNameActive.required).to.be.undefined
    expect(classNameActive.type).to.equal(String)
    expect(classNameActive.default).to.equal('active')
  })

  it('should validate `classNameHandle` prop', function () {
    const classNameHandle = getProp('classNameHandle')

    expect(classNameHandle.required).to.be.undefined
    expect(classNameHandle.type).to.equal(String)
    expect(classNameHandle.default).to.equal('handle')
  })

  it('should validate `disableUserSelect` prop', function () {
    const disableUserSelect = getProp('disableUserSelect')

    expect(disableUserSelect.required).to.be.undefined
    expect(disableUserSelect.type).to.equal(Boolean)
    expect(disableUserSelect.default).to.be.true
  })

  it('should validate `enableNativeDrag` prop', function () {
    const enableNativeDrag = getProp('enableNativeDrag')

    expect(enableNativeDrag.required).to.be.undefined
    expect(enableNativeDrag.type).to.equal(Boolean)
    expect(enableNativeDrag.default).to.be.false
  })

  it('should validate `preventDeactivation` prop', function () {
    const preventDeactivation = getProp('preventDeactivation')

    expect(preventDeactivation.required).to.be.undefined
    expect(preventDeactivation.type).to.equal(Boolean)
    expect(preventDeactivation.default).to.be.false
  })

  it('should validate `active` prop', function () {
    const active = getProp('active')

    expect(active.required).to.be.undefined
    expect(active.type).to.equal(Boolean)
    expect(active.default).to.be.false
  })

  it('should validate `draggable` prop', function () {
    const draggable = getProp('draggable')

    expect(draggable.required).to.be.undefined
    expect(draggable.type).to.equal(Boolean)
    expect(draggable.default).to.be.true
  })

  it('should validate `resizable` prop', function () {
    const resizable = getProp('resizable')

    expect(resizable.required).to.be.undefined
    expect(resizable.type).to.equal(Boolean)
    expect(resizable.default).to.be.true
  })

  it('should validate `lockAspectRatio` prop', function () {
    const lockAspectRatio = getProp('lockAspectRatio')

    expect(lockAspectRatio.required).to.be.undefined
    expect(lockAspectRatio.type).to.equal(Boolean)
    expect(lockAspectRatio.default).to.be.false
  })

  it('should validate `w` prop', function () {
    const w = getProp('w')

    expect(w.required).to.be.undefined
    expect(w.type).to.contain(String)
    expect(w.type).to.contain(Number)
    expect(w.validator('auto')).to.be.true
    expect(w.validator(200)).to.be.true
    expect(w.validator('random')).to.be.false
    expect(w.validator(-200)).to.be.false
  })

  it('should validate `h` prop', function () {
    const h = getProp('w')

    expect(h.required).to.be.undefined
    expect(h.type).to.contain(String)
    expect(h.type).to.contain(Number)
    expect(h.validator('auto')).to.be.true
    expect(h.validator(200)).to.be.true
    expect(h.validator('random')).to.be.false
    expect(h.validator(-200)).to.be.false
  })

  it('should validate `minWidth` prop', function () {
    const minWidth = getProp('minWidth')

    expect(minWidth.required).to.be.undefined
    expect(minWidth.type).to.equal(Number)
    expect(minWidth.default).to.equal(0)
    expect(minWidth.validator(1)).to.be.true
    expect(minWidth.validator(-1)).to.be.false
  })

  it('should validate `minHeight` prop', function () {
    const minHeight = getProp('minHeight')

    expect(minHeight.required).to.be.undefined
    expect(minHeight.type).to.equal(Number)
    expect(minHeight.default).to.equal(0)
    expect(minHeight.validator(1)).to.be.true
    expect(minHeight.validator(-1)).to.be.false
  })

  it('should validate `maxWidth` prop', function () {
    const maxWidth = getProp('maxWidth')

    expect(maxWidth.required).to.be.undefined
    expect(maxWidth.type).to.equal(Number)
    expect(maxWidth.default).to.be.null
    expect(maxWidth.validator(1)).to.be.true
    expect(maxWidth.validator(-1)).to.be.false
  })

  it('should validate `maxHeight` prop', function () {
    const maxHeight = getProp('maxHeight')

    expect(maxHeight.required).to.be.undefined
    expect(maxHeight.type).to.equal(Number)
    expect(maxHeight.default).to.be.null
    expect(maxHeight.validator(1)).to.be.true
    expect(maxHeight.validator(-1)).to.be.false
  })

  it('should validate `x` prop', function () {
    const x = getProp('x')

    expect(x.required).to.be.undefined
    expect(x.type).to.equal(Number)
    expect(x.default).to.equal(0)
  })

  it('should validate `y` prop', function () {
    const y = getProp('y')

    expect(y.required).to.be.undefined
    expect(y.type).to.equal(Number)
    expect(y.default).to.equal(0)
  })

  it('should validate `z` prop', function () {
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

  it('should validate `handles` prop', function () {
    const handles = getProp('handles')

    expect(handles.required).to.be.undefined
    expect(handles.type).to.equal(Array)
    expect(handles.default()).to.deep.equal(['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'])
    expect(handles.validator([])).to.be.true
    expect(handles.validator(['cc', 'pp'])).to.be.false
  })

  it('should validate `dragHandle` prop', function () {
    const dragHandle = getProp('dragHandle')

    expect(dragHandle.required).to.be.undefined
    expect(dragHandle.type).to.equal(String)
    expect(dragHandle.default).to.be.null
  })

  it('should validate `dragCancel` prop', function () {
    const dragCancel = getProp('dragCancel')

    expect(dragCancel.required).to.be.undefined
    expect(dragCancel.type).to.equal(String)
    expect(dragCancel.default).to.be.null
  })

  it('should validate `axis` prop', function () {
    const axis = getProp('axis')

    expect(axis.required).to.be.undefined
    expect(axis.type).to.equal(String)
    expect(axis.default).to.equal('both')
    expect(axis.validator('x')).to.be.true
    expect(axis.validator('y')).to.be.true
    expect(axis.validator('both')).to.be.true
    expect(axis.validator('test')).to.be.false
  })

  it('should validate `grid` prop', function () {
    const grid = getProp('grid')

    expect(grid.required).to.be.undefined
    expect(grid.type).to.equal(Array)
    expect(grid.default()).to.deep.equal([1, 1])
  })

  it('should validate `parent` prop', function () {
    const parent = getProp('parent')

    expect(parent.required).to.be.undefined
    expect(parent.type).to.equal(Boolean)
    expect(parent.default).to.equal(false)
  })

  it('should validate `scale` prop', function () {
    const scale = getProp('scale')

    expect(scale.required).to.be.undefined
    expect(scale.type).to.equal(Number)
    expect(scale.default).to.equal(1)
    expect(scale.validator(1)).to.be.true
    expect(scale.validator(0)).to.be.false
    expect(scale.validator(-1)).to.be.false
  })

  it('should validate `onDragStart` prop', function () {
    const onDragStart = getProp('onDragStart')

    expect(onDragStart.required).to.be.undefined
    expect(onDragStart.type).to.equal(Function)
    expect(onDragStart.default()).to.equal(true)
  })

  it('should validate `onDrag` prop', function () {
    const onDrag = getProp('onDrag')

    expect(onDrag.required).to.be.undefined
    expect(onDrag.type).to.equal(Function)
    expect(onDrag.default()).to.equal(true)
  })

  it('should validate `onResizeStart` prop', function () {
    const onResizeStart = getProp('onResizeStart')

    expect(onResizeStart.required).to.be.undefined
    expect(onResizeStart.type).to.equal(Function)
    expect(onResizeStart.default()).to.equal(true)
  })

  it('should validate `onResize` prop', function () {
    const onResize = getProp('onResize')

    expect(onResize.required).to.be.undefined
    expect(onResize.type).to.equal(Function)
    expect(onResize.default()).to.equal(true)
  })

  afterEach(() => wrapper.destroy())
})
