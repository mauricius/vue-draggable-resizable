<template>
  <div
    :style="style"
    :class="[{
      [classNameActive]: enabled,
      [classNameDragging]: dragging,
      [classNameResizing]: resizing,
      [classNameDraggable]: draggable,
      [classNameResizable]: resizable
    }, className]"
    @mousedown="elementMouseDown"
    @touchstart="elementTouchDown"
  >
    <div
      v-for="handle in actualHandles"
      :key="handle"
      :class="[classNameHandle, classNameHandle + '-' + handle]"
      :style="{display: enabled ? 'block' : 'none'}"
      @mousedown.stop.prevent="handleDown(handle, $event)"
      @touchstart.stop.prevent="handleTouchDown(handle, $event)"
    >
      <slot :name="handle"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import { matchesSelectorToParentElements, getComputedSize, addEvent, removeEvent } from '../utils/dom'
import { computeWidth, computeHeight, restrictToBounds, snapToGrid } from '../utils/fns'

const events = {
  mouse: {
    start: 'mousedown',
    move: 'mousemove',
    stop: 'mouseup'
  },
  touch: {
    start: 'touchstart',
    move: 'touchmove',
    stop: 'touchend'
  }
}

const userSelectNone = {
  userSelect: 'none',
  MozUserSelect: 'none',
  WebkitUserSelect: 'none',
  MsUserSelect: 'none'
}

const userSelectAuto = {
  userSelect: 'auto',
  MozUserSelect: 'auto',
  WebkitUserSelect: 'auto',
  MsUserSelect: 'auto'
}

let eventsFor = events.mouse

export default {
  replace: true,
  name: 'vue-draggable-resizable',
  props: {
    className: {
      type: String,
      default: 'vdr'
    },
    classNameDraggable: {
      type: String,
      default: 'draggable'
    },
    classNameResizable: {
      type: String,
      default: 'resizable'
    },
    classNameDragging: {
      type: String,
      default: 'dragging'
    },
    classNameResizing: {
      type: String,
      default: 'resizing'
    },
    classNameActive: {
      type: String,
      default: 'active'
    },
    classNameHandle: {
      type: String,
      default: 'handle'
    },
    disableUserSelect: {
      type: Boolean,
      default: true
    },
    enableNativeDrag: {
      type: Boolean,
      default: false
    },
    preventDeactivation: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    draggable: {
      type: Boolean,
      default: true
    },
    resizable: {
      type: Boolean,
      default: true
    },
    lockAspectRatio: {
      type: Boolean,
      default: false
    },
    w: {
      type: [Number, String],
      default: 200,
      validator: (val) => {
        if (typeof val === 'number') {
          return val > 0
        }

        return val === 'auto'
      }
    },
    h: {
      type: [Number, String],
      default: 200,
      validator: (val) => {
        if (typeof val === 'number') {
          return val > 0
        }

        return val === 'auto'
      }
    },
    minWidth: {
      type: Number,
      default: 0,
      validator: (val) => val >= 0
    },
    minHeight: {
      type: Number,
      default: 0,
      validator: (val) => val >= 0
    },
    maxWidth: {
      type: Number,
      default: null,
      validator: (val) => val >= 0
    },
    maxHeight: {
      type: Number,
      default: null,
      validator: (val) => val >= 0
    },
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    },
    z: {
      type: [String, Number],
      default: 'auto',
      validator: (val) => (typeof val === 'string' ? val === 'auto' : val >= 0)
    },
    handles: {
      type: Array,
      default: () => ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'],
      validator: (val) => {
        const s = new Set(['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'])

        return new Set(val.filter(h => s.has(h))).size === val.length
      }
    },
    dragHandle: {
      type: String,
      default: null
    },
    dragCancel: {
      type: String,
      default: null
    },
    axis: {
      type: String,
      default: 'both',
      validator: (val) => ['x', 'y', 'both'].includes(val)
    },
    grid: {
      type: Array,
      default: () => [1, 1]
    },
    parent: {
      type: Boolean,
      default: false
    },
    scale: {
      type: Number,
      default: 1,
      validator: (val) => val > 0
    },
    onDragStart: {
      type: Function,
      default: () => true
    },
    onDrag: {
      type: Function,
      default: () => true
    },
    onResizeStart: {
      type: Function,
      default: () => true
    },
    onResize: {
      type: Function,
      default: () => true
    }
  },

  data: function () {
    return {
      left: this.x,
      top: this.y,
      right: null,
      bottom: null,

      width: null,
      height: null,

      widthTouched: false,
      heightTouched: false,

      aspectFactor: null,

      parentWidth: null,
      parentHeight: null,

      minW: this.minWidth,
      minH: this.minHeight,

      maxW: this.maxWidth,
      maxH: this.maxHeight,

      handle: null,
      enabled: this.active,
      resizing: false,
      dragging: false,
      zIndex: this.z
    }
  },

  created: function () {
    // eslint-disable-next-line
    if (this.maxWidth && this.minWidth > this.maxWidth) console.warn('[Vdr warn]: Invalid prop: minWidth cannot be greater than maxWidth')
    // eslint-disable-next-line
    if (this.maxWidth && this.minHeight > this.maxHeight) console.warn('[Vdr warn]: Invalid prop: minHeight cannot be greater than maxHeight')

    this.resetBoundsAndMouseState()
  },
  mounted: function () {
    if (!this.enableNativeDrag) {
      this.$el.ondragstart = () => false
    }

    const [parentWidth, parentHeight] = this.getParentSize()

    this.parentWidth = parentWidth
    this.parentHeight = parentHeight

    const [width, height] = getComputedSize(this.$el)

    this.aspectFactor = (this.w !== 'auto' ? this.w : width) / (this.h !== 'auto' ? this.h : height)

    this.width = this.w !== 'auto' ? this.w : width
    this.height = this.h !== 'auto' ? this.h : height

    this.right = this.parentWidth - this.width - this.left
    this.bottom = this.parentHeight - this.height - this.top

    addEvent(document.documentElement, 'mousedown', this.deselect)
    addEvent(document.documentElement, 'touchend touchcancel', this.deselect)

    addEvent(window, 'resize', this.checkParentSize)
  },
  beforeDestroy: function () {
    removeEvent(document.documentElement, 'mousedown', this.deselect)
    removeEvent(document.documentElement, 'touchstart', this.handleUp)
    removeEvent(document.documentElement, 'mousemove', this.move)
    removeEvent(document.documentElement, 'touchmove', this.move)
    removeEvent(document.documentElement, 'mouseup', this.handleUp)
    removeEvent(document.documentElement, 'touchend touchcancel', this.deselect)

    removeEvent(window, 'resize', this.checkParentSize)
  },

  methods: {
    resetBoundsAndMouseState () {
      this.mouseClickPosition = { mouseX: 0, mouseY: 0, x: 0, y: 0, w: 0, h: 0 }

      this.bounds = {
        minLeft: null,
        maxLeft: null,
        minRight: null,
        maxRight: null,
        minTop: null,
        maxTop: null,
        minBottom: null,
        maxBottom: null
      }
    },
    checkParentSize () {
      if (this.parent) {
        const [newParentWidth, newParentHeight] = this.getParentSize()

        this.parentWidth = newParentWidth
        this.parentHeight = newParentHeight
      }
    },
    getParentSize () {
      if (this.parent) {
        const style = window.getComputedStyle(this.$el.parentNode, null)

        return [
          parseInt(style.getPropertyValue('width'), 10),
          parseInt(style.getPropertyValue('height'), 10)
        ]
      }

      return [null, null]
    },
    elementTouchDown (e) {
      eventsFor = events.touch

      this.elementDown(e)
    },
    elementMouseDown (e) {
      eventsFor = events.mouse

      this.elementDown(e)
    },
    elementDown (e) {
      if (e instanceof MouseEvent && e.which !== 1) {
        return
      }

      const target = e.target || e.srcElement

      if (this.$el.contains(target)) {
        if (this.onDragStart(e) === false) {
          return
        }

        if (
          (this.dragHandle && !matchesSelectorToParentElements(target, this.dragHandle, this.$el)) ||
          (this.dragCancel && matchesSelectorToParentElements(target, this.dragCancel, this.$el))
        ) {
          this.dragging = false

          return
        }

        if (!this.enabled) {
          this.enabled = true

          this.$emit('activated')
          this.$emit('update:active', true)
        }

        if (this.draggable) {
          this.dragging = true
        }

        this.mouseClickPosition.mouseX = e.touches ? e.touches[0].pageX : e.pageX
        this.mouseClickPosition.mouseY = e.touches ? e.touches[0].pageY : e.pageY

        this.mouseClickPosition.left = this.left
        this.mouseClickPosition.right = this.right
        this.mouseClickPosition.top = this.top
        this.mouseClickPosition.bottom = this.bottom

        if (this.parent) {
          this.bounds = this.calcDragLimits()
        }

        addEvent(document.documentElement, eventsFor.move, this.move)
        addEvent(document.documentElement, eventsFor.stop, this.handleUp)
      }
    },
    calcDragLimits () {
      return {
        minLeft: this.left % this.grid[0],
        maxLeft: Math.floor((this.parentWidth - this.width - this.left) / this.grid[0]) * this.grid[0] + this.left,
        minRight: this.right % this.grid[0],
        maxRight: Math.floor((this.parentWidth - this.width - this.right) / this.grid[0]) * this.grid[0] + this.right,
        minTop: this.top % this.grid[1],
        maxTop: Math.floor((this.parentHeight - this.height - this.top) / this.grid[1]) * this.grid[1] + this.top,
        minBottom: this.bottom % this.grid[1],
        maxBottom: Math.floor((this.parentHeight - this.height - this.bottom) / this.grid[1]) * this.grid[1] + this.bottom
      }
    },
    deselect (e) {
      const target = e.target || e.srcElement
      const regex = new RegExp(this.className + '-([trmbl]{2})', '')

      if (!this.$el.contains(target) && !regex.test(target.className)) {
        if (this.enabled && !this.preventDeactivation) {
          this.enabled = false

          this.$emit('deactivated')
          this.$emit('update:active', false)
        }

        removeEvent(document.documentElement, eventsFor.move, this.handleResize)
      }

      this.resetBoundsAndMouseState()
    },
    handleTouchDown (handle, e) {
      eventsFor = events.touch

      this.handleDown(handle, e)
    },
    handleDown (handle, e) {
      if (e instanceof MouseEvent && e.which !== 1) {
        return
      }

      if (this.onResizeStart(handle, e) === false) {
        return
      }

      if (e.stopPropagation) e.stopPropagation()

      // Here we avoid a dangerous recursion by faking
      // corner handles as middle handles
      if (this.lockAspectRatio && !handle.includes('m')) {
        this.handle = 'm' + handle.substring(1)
      } else {
        this.handle = handle
      }

      this.resizing = true

      this.mouseClickPosition.mouseX = e.touches ? e.touches[0].pageX : e.pageX
      this.mouseClickPosition.mouseY = e.touches ? e.touches[0].pageY : e.pageY
      this.mouseClickPosition.left = this.left
      this.mouseClickPosition.right = this.right
      this.mouseClickPosition.top = this.top
      this.mouseClickPosition.bottom = this.bottom

      this.bounds = this.calcResizeLimits()

      addEvent(document.documentElement, eventsFor.move, this.handleResize)
      addEvent(document.documentElement, eventsFor.stop, this.handleUp)
    },
    calcResizeLimits () {
      let minW = this.minW
      let minH = this.minH
      let maxW = this.maxW
      let maxH = this.maxH

      const aspectFactor = this.aspectFactor
      const [gridX, gridY] = this.grid
      const width = this.width
      const height = this.height
      const left = this.left
      const top = this.top
      const right = this.right
      const bottom = this.bottom

      if (this.lockAspectRatio) {
        if (minW / minH > aspectFactor) {
          minH = minW / aspectFactor
        } else {
          minW = aspectFactor * minH
        }

        if (maxW && maxH) {
          maxW = Math.min(maxW, aspectFactor * maxH)
          maxH = Math.min(maxH, maxW / aspectFactor)
        } else if (maxW) {
          maxH = maxW / aspectFactor
        } else if (maxH) {
          maxW = aspectFactor * maxH
        }
      }

      maxW = maxW - (maxW % gridX)
      maxH = maxH - (maxH % gridY)

      const limits = {
        minLeft: null,
        maxLeft: null,
        minTop: null,
        maxTop: null,
        minRight: null,
        maxRight: null,
        minBottom: null,
        maxBottom: null
      }

      if (this.parent) {
        limits.minLeft = left % gridX
        limits.maxLeft = left + Math.floor((width - minW) / gridX) * gridX
        limits.minTop = top % gridY
        limits.maxTop = top + Math.floor((height - minH) / gridY) * gridY
        limits.minRight = right % gridX
        limits.maxRight = right + Math.floor((width - minW) / gridX) * gridX
        limits.minBottom = bottom % gridY
        limits.maxBottom = bottom + Math.floor((height - minH) / gridY) * gridY

        if (maxW) {
          limits.minLeft = Math.max(limits.minLeft, this.parentWidth - right - maxW)
          limits.minRight = Math.max(limits.minRight, this.parentWidth - left - maxW)
        }

        if (maxH) {
          limits.minTop = Math.max(limits.minTop, this.parentHeight - bottom - maxH)
          limits.minBottom = Math.max(limits.minBottom, this.parentHeight - top - maxH)
        }

        if (this.lockAspectRatio) {
          limits.minLeft = Math.max(limits.minLeft, left - top * aspectFactor)
          limits.minTop = Math.max(limits.minTop, top - left / aspectFactor)
          limits.minRight = Math.max(limits.minRight, right - bottom * aspectFactor)
          limits.minBottom = Math.max(limits.minBottom, bottom - right / aspectFactor)
        }
      } else {
        limits.minLeft = null
        limits.maxLeft = left + Math.floor((width - minW) / gridX) * gridX
        limits.minTop = null
        limits.maxTop = top + Math.floor((height - minH) / gridY) * gridY
        limits.minRight = null
        limits.maxRight = right + Math.floor((width - minW) / gridX) * gridX
        limits.minBottom = null
        limits.maxBottom = bottom + Math.floor((height - minH) / gridY) * gridY

        if (maxW) {
          limits.minLeft = -(right + maxW)
          limits.minRight = -(left + maxW)
        }

        if (maxH) {
          limits.minTop = -(bottom + maxH)
          limits.minBottom = -(top + maxH)
        }

        if (this.lockAspectRatio && (maxW && maxH)) {
          limits.minLeft = Math.min(limits.minLeft, -(right + maxW))
          limits.minTop = Math.min(limits.minTop, -(maxH + bottom))
          limits.minRight = Math.min(limits.minRight, -left - maxW)
          limits.minBottom = Math.min(limits.minBottom, -top - maxH)
        }
      }

      return limits
    },
    move (e) {
      if (this.resizing) {
        this.handleResize(e)
      } else if (this.dragging) {
        this.handleDrag(e)
      }
    },
    handleDrag (e) {
      const axis = this.axis
      const grid = this.grid
      const bounds = this.bounds
      const mouseClickPosition = this.mouseClickPosition

      const tmpDeltaX = axis && axis !== 'y' ? mouseClickPosition.mouseX - (e.touches ? e.touches[0].pageX : e.pageX) : 0
      const tmpDeltaY = axis && axis !== 'x' ? mouseClickPosition.mouseY - (e.touches ? e.touches[0].pageY : e.pageY) : 0

      const [deltaX, deltaY] = snapToGrid(grid, tmpDeltaX, tmpDeltaY, this.scale)

      const left = restrictToBounds(mouseClickPosition.left - deltaX, bounds.minLeft, bounds.maxLeft)
      const top = restrictToBounds(mouseClickPosition.top - deltaY, bounds.minTop, bounds.maxTop)

      if (this.onDrag(left, top) === false) {
        return
      }

      const right = restrictToBounds(mouseClickPosition.right + deltaX, bounds.minRight, bounds.maxRight)
      const bottom = restrictToBounds(mouseClickPosition.bottom + deltaY, bounds.minBottom, bounds.maxBottom)

      this.left = left
      this.top = top
      this.right = right
      this.bottom = bottom

      this.$emit('dragging', this.left, this.top)
    },
    moveHorizontally (val) {
      const [deltaX, _] = snapToGrid(this.grid, val, this.top, this.scale)

      const left = restrictToBounds(deltaX, this.bounds.minLeft, this.bounds.maxLeft)

      this.left = left
      this.right = this.parentWidth - this.width - left
    },
    moveVertically (val) {
      const [_, deltaY] = snapToGrid(this.grid, this.left, val, this.scale)

      const top = restrictToBounds(deltaY, this.bounds.minTop, this.bounds.maxTop)

      this.top = top
      this.bottom = this.parentHeight - this.height - top
    },
    handleResize (e) {
      let left = this.left
      let top = this.top
      let right = this.right
      let bottom = this.bottom

      const mouseClickPosition = this.mouseClickPosition
      const lockAspectRatio = this.lockAspectRatio
      const aspectFactor = this.aspectFactor

      const tmpDeltaX = mouseClickPosition.mouseX - (e.touches ? e.touches[0].pageX : e.pageX)
      const tmpDeltaY = mouseClickPosition.mouseY - (e.touches ? e.touches[0].pageY : e.pageY)

      if (!this.widthTouched && tmpDeltaX) {
        this.widthTouched = true
      }

      if (!this.heightTouched && tmpDeltaY) {
        this.heightTouched = true
      }

      const [deltaX, deltaY] = snapToGrid(this.grid, tmpDeltaX, tmpDeltaY, this.scale)

      if (this.handle.includes('b')) {
        bottom = restrictToBounds(
          mouseClickPosition.bottom + deltaY,
          this.bounds.minBottom,
          this.bounds.maxBottom
        )

        if (this.lockAspectRatio && this.resizingOnY) {
          right = this.right - (this.bottom - bottom) * aspectFactor
        }
      } else if (this.handle.includes('t')) {
        top = restrictToBounds(
          mouseClickPosition.top - deltaY,
          this.bounds.minTop,
          this.bounds.maxTop
        )

        if (this.lockAspectRatio && this.resizingOnY) {
          left = this.left - (this.top - top) * aspectFactor
        }
      }

      if (this.handle.includes('r')) {
        right = restrictToBounds(
          mouseClickPosition.right + deltaX,
          this.bounds.minRight,
          this.bounds.maxRight
        )

        if (this.lockAspectRatio && this.resizingOnX) {
          bottom = this.bottom - (this.right - right) / aspectFactor
        }
      } else if (this.handle.includes('l')) {
        left = restrictToBounds(
          mouseClickPosition.left - deltaX,
          this.bounds.minLeft,
          this.bounds.maxLeft
        )

        if (this.lockAspectRatio && this.resizingOnX) {
          top = this.top - (this.left - left) / aspectFactor
        }
      }

      const width = computeWidth(this.parentWidth, left, right)
      const height = computeHeight(this.parentHeight, top, bottom)

      if (this.onResize(this.handle, left, top, width, height) === false) {
        return
      }

      this.left = left
      this.top = top
      this.right = right
      this.bottom = bottom
      this.width = width
      this.height = height

      this.$emit('resizing', this.left, this.top, this.width, this.height)
    },
    changeWidth (val) {
      const [newWidth, _] = snapToGrid(this.grid, val, 0, this.scale)

      let right = restrictToBounds(
        (this.parentWidth - newWidth - this.left),
        this.bounds.minRight,
        this.bounds.maxRight
      )
      let bottom = this.bottom

      if (this.lockAspectRatio) {
        bottom = this.bottom - (this.right - right) / this.aspectFactor
      }

      const width = computeWidth(this.parentWidth, this.left, right)
      const height = computeHeight(this.parentHeight, this.top, bottom)

      this.right = right
      this.bottom = bottom
      this.width = width
      this.height = height
    },
    changeHeight (val) {
      const [_, newHeight] = snapToGrid(this.grid, 0, val, this.scale)

      let bottom = restrictToBounds(
        (this.parentHeight - newHeight - this.top),
        this.bounds.minBottom,
        this.bounds.maxBottom
      )
      let right = this.right

      if (this.lockAspectRatio) {
        right = this.right - (this.bottom - bottom) * this.aspectFactor
      }

      const width = computeWidth(this.parentWidth, this.left, right)
      const height = computeHeight(this.parentHeight, this.top, bottom)

      this.right = right
      this.bottom = bottom
      this.width = width
      this.height = height
    },
    handleUp (e) {
      this.handle = null

      this.resetBoundsAndMouseState()

      if (this.resizing) {
        this.resizing = false
        this.$emit('resizestop', this.left, this.top, this.width, this.height)
      }
      if (this.dragging) {
        this.dragging = false
        this.$emit('dragstop', this.left, this.top)
      }

      removeEvent(document.documentElement, eventsFor.move, this.handleResize)
    }
  },
  computed: {
    style () {
      return {
        transform: `translate(${this.left}px, ${this.top}px)`,
        width: this.computedWidth,
        height: this.computedHeight,
        zIndex: this.zIndex,
        ...(this.dragging && this.disableUserSelect ? userSelectNone : userSelectAuto)
      }
    },
    actualHandles () {
      if (!this.resizable) return []

      return this.handles
    },
    computedWidth () {
      if (this.w === 'auto') {
        if (!this.widthTouched) {
          return 'auto'
        }
      }

      return this.width + 'px'
    },
    computedHeight () {
      if (this.h === 'auto') {
        if (!this.heightTouched) {
          return 'auto'
        }
      }

      return this.height + 'px'
    },
    resizingOnX () {
      return (Boolean(this.handle) && (this.handle.includes('l') || this.handle.includes('r')))
    },
    resizingOnY () {
      return (Boolean(this.handle) && (this.handle.includes('t') || this.handle.includes('b')))
    },
    isCornerHandle () {
      return (Boolean(this.handle) && ['tl', 'tr', 'br', 'bl'].includes(this.handle))
    }
  },

  watch: {
    active (val) {
      this.enabled = val

      if (val) {
        this.$emit('activated')
      } else {
        this.$emit('deactivated')
      }
    },
    z (val) {
      if (val >= 0 || val === 'auto') {
        this.zIndex = val
      }
    },
    x (val) {
      if (this.resizing || this.dragging) {
        return
      }

      if (this.parent) {
        this.bounds = this.calcDragLimits()
      }

      this.moveHorizontally(val)
    },
    y (val) {
      if (this.resizing || this.dragging) {
        return
      }

      if (this.parent) {
        this.bounds = this.calcDragLimits()
      }

      this.moveVertically(val)
    },
    lockAspectRatio (val) {
      if (val) {
        this.aspectFactor = this.width / this.height
      } else {
        this.aspectFactor = undefined
      }
    },
    minWidth (val) {
      if (val > 0 && val <= this.width) {
        this.minW = val
      }
    },
    minHeight (val) {
      if (val > 0 && val <= this.height) {
        this.minH = val
      }
    },
    maxWidth (val) {
      this.maxW = val
    },
    maxHeight (val) {
      this.maxH = val
    },
    w (val) {
      if (this.resizing || this.dragging) {
        return
      }

      if (this.parent) {
        this.bounds = this.calcResizeLimits()
      }

      this.changeWidth(val)
    },
    h (val) {
      if (this.resizing || this.dragging) {
        return
      }

      if (this.parent) {
        this.bounds = this.calcResizeLimits()
      }

      this.changeHeight(val)
    }
  }
}
</script>
