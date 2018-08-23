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
    @mousedown.stop="elementDown"
    @touchstart.prevent.stop="elementTouchDown"
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
import { matchesSelectorToParentElements, addEvent, removeEvent } from '../utils/dom'

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
    debug: {
      type: Boolean,
      default: false
    },
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
      type: Number,
      default: 200,
      validator: (val) => val > 0
    },
    h: {
      type: Number,
      default: 200,
      validator: (val) => val > 0
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
    x: {
      type: Number,
      default: 0,
      validator: (val) => typeof val === 'number'
    },
    y: {
      type: Number,
      default: 0,
      validator: (val) => typeof val === 'number'
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
        var s = new Set(['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'])

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
      type: [Boolean, String],
      default: false
    }
  },

  data: function () {
    return {
      rawWidth: this.w,
      rawHeight: this.h,
      rawLeft: this.x,
      rawTop: this.y,
      rawRight: null,
      rawBottom: null,

      left: this.x,
      top: this.y,
      right: null,
      bottom: null,

      aspectFactor: this.w / this.h,

      parentWidth: null,
      parentHeight: null,

      minW: this.minWidth,
      minH: this.minHeight,

      handle: null,
      enabled: this.active,
      resizing: false,
      dragging: false,
      zIndex: this.z
    }
  },

  created: function () {
    this.resetBoundsAndMouseState()
  },
  mounted: function () {
    if (!this.enableNativeDrag) {
      this.$el.ondragstart = () => false
    }

    [this.parentWidth, this.parentHeight] = this.getParentSize()

    this.rawRight = this.parentWidth - this.rawWidth - this.rawLeft
    this.rawBottom = this.parentHeight - this.rawHeight - this.rawTop

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

        const deltaX = this.parentWidth - newParentWidth
        const deltaY = this.parentHeight - newParentHeight

        this.rawRight -= deltaX
        this.rawBottom -= deltaY

        this.parentWidth = newParentWidth
        this.parentHeight = newParentHeight
      }
    },
    getParentSize () {
      const parent = this.parent

      if (parent === true) {
        return [
          this.$el.parentNode.offsetWidth,
          this.$el.parentNode.offsetHeight
        ]
      }

      if (typeof parent === 'string') {
        const parentNode = document.querySelector(parent)

        if (!(parentNode instanceof HTMLElement)) {
          throw new Error(`The selector ${parent} does not match any element`)
        }

        return [parentNode.offsetWidth, parentNode.offsetHeight]
      }

      return [null, null]
    },
    elementTouchDown (e) {
      eventsFor = events.touch

      this.elementDown(e)
    },
    elementDown (e) {
      const target = e.target || e.srcElement

      if (this.$el.contains(target)) {
        if (
          (this.dragHandle && !matchesSelectorToParentElements(target, this.dragHandle, this.$el)) ||
          (this.dragCancel && matchesSelectorToParentElements(target, this.dragCancel, this.$el))
        ) {
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
        minLeft: (this.parentWidth + this.left) % this.grid[0],
        maxLeft: Math.floor((this.parentWidth - this.width - this.left) / this.grid[0]) * this.grid[0] + this.left,
        minRight: (this.parentWidth + this.right) % this.grid[0],
        maxRight: Math.floor((this.parentWidth - this.width - this.right) / this.grid[0]) * this.grid[0] + this.right,
        minTop: (this.parentHeight + this.top) % this.grid[1],
        maxTop: Math.floor((this.parentHeight - this.height - this.top) / this.grid[1]) * this.grid[1] + this.top,
        minBottom: (this.parentHeight + this.bottom) % this.grid[1],
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

        removeEvent(document.documentElement, eventsFor.move, this.handleMove)
      }

      this.resetBoundsAndMouseState()
    },
    handleTouchDown (handle, e) {
      eventsFor = events.touch

      this.handleDown(handle, e)
    },
    handleDown (handle, e) {
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

      addEvent(document.documentElement, eventsFor.move, this.handleMove)
    },
    calcResizeLimits () {
      let minW = this.minW
      let minH = this.minH

      const aspectFactor = this.aspectFactor
      const [gridX, gridY] = this.grid
      const width = this.width
      const height = this.height
      const bottom = this.bottom
      const top = this.top
      const left = this.left
      const right = this.right

      if (this.lockAspectRatio) {
        if (minW / minH > aspectFactor) {
          minH = minW / aspectFactor
        } else {
          minW = aspectFactor * minH
        }
      }

      const limits = {
        minLeft: this.parent ? (this.parentWidth + left) % gridX : null,
        maxLeft: left + Math.floor((width - minW) / gridX) * gridX,
        minRight: this.parent ? (this.parentWidth + right) % gridX : null,
        maxRight: right + Math.floor((width - minW) / gridX) * gridX,
        minTop: this.parent ? (this.parentHeight + top) % gridY : null,
        maxTop: top + Math.floor((height - minH) / gridY) * gridY,
        minBottom: this.parent ? (this.parentHeight + bottom) % gridY : null,
        maxBottom: bottom + Math.floor((height - minH) / gridY) * gridY
      }

      if (this.lockAspectRatio && this.parent) {
        const aspectRatioLimits = {
          minLeft: left - top * aspectFactor,
          minRight: right - bottom * aspectFactor,
          minTop: top - left / aspectFactor,
          minBottom: bottom - right / aspectFactor
        }

        limits.minTop = Math.max(limits.minTop, aspectRatioLimits.minTop)
        limits.minLeft = Math.max(limits.minLeft, aspectRatioLimits.minLeft)
        limits.minRight = Math.max(limits.minRight, aspectRatioLimits.minRight)
        limits.minBottom = Math.max(limits.minBottom, aspectRatioLimits.minBottom)
      }

      return limits
    },
    move (e) {
      if (this.resizing) {
        this.handleMove(e)
      } else if (this.dragging) {
        this.elementMove(e)
      }
    },
    elementMove (e) {
      const axis = this.axis
      const grid = this.grid
      const mouseClickPosition = this.mouseClickPosition

      const tmpDeltaX = axis && axis !== 'y' ? mouseClickPosition.mouseX - (e.touches ? e.touches[0].pageX : e.pageX) : 0
      const tmpDeltaY = axis && axis !== 'x' ? mouseClickPosition.mouseY - (e.touches ? e.touches[0].pageY : e.pageY) : 0

      const [deltaX, deltaY] = this.snapToGrid(this.grid, tmpDeltaX, tmpDeltaY)

      if (!deltaX && !deltaY) return

      this.rawTop = mouseClickPosition.top - deltaY
      this.rawBottom = mouseClickPosition.bottom + deltaY
      this.rawLeft = mouseClickPosition.left - deltaX
      this.rawRight = mouseClickPosition.right + deltaX

      this.$emit('dragging', this.left, this.top)
    },
    handleMove (e) {
      const handle = this.handle
      const mouseClickPosition = this.mouseClickPosition

      const tmpDeltaX = mouseClickPosition.mouseX - (e.touches ? e.touches[0].pageX : e.pageX)
      const tmpDeltaY = mouseClickPosition.mouseY - (e.touches ? e.touches[0].pageY : e.pageY)

      const [deltaX, deltaY] = this.snapToGrid(this.grid, tmpDeltaX, tmpDeltaY)

      if (!deltaX && !deltaY) return

      if (handle.includes('b')) {
        this.rawBottom = mouseClickPosition.bottom + deltaY
      } else if (handle.includes('t')) {
        this.rawTop = mouseClickPosition.top - deltaY
      }

      if (handle.includes('r')) {
        this.rawRight = mouseClickPosition.right + deltaX
      } else if (handle.includes('l')) {
        this.rawLeft = mouseClickPosition.left - deltaX
      }

      this.$emit('resizing', this.left, this.top, this.width, this.height)
    },
    handleUp (e) {
      this.handle = null

      this.resetBoundsAndMouseState()

      this.rawTop = this.top
      this.rawBottom = this.bottom
      this.rawLeft = this.left
      this.rawRight = this.right

      if (this.resizing) {
        this.resizing = false
        this.$emit('resizestop', this.left, this.top, this.width, this.height)
      }
      if (this.dragging) {
        this.dragging = false
        this.$emit('dragstop', this.left, this.top)
      }

      removeEvent(document.documentElement, eventsFor.move, this.handleMove)
    },
    snapToGrid (grid, pendingX, pendingY) {
      const x = Math.round(pendingX / grid[0]) * grid[0]
      const y = Math.round(pendingY / grid[1]) * grid[1]

      return [x, y]
    }
  },
  computed: {
    style () {
      return {
        position: 'absolute',
        top: this.top + 'px',
        left: this.left + 'px',
        width: this.width + 'px',
        height: this.height + 'px',
        zIndex: this.zIndex,
        ...(this.dragging && this.disableUserSelect ? userSelectNone : userSelectAuto)
      }
    },
    actualHandles () {
      if (!this.resizable) return []

      return this.handles
    },
    width () {
      return this.parentWidth - this.left - this.right
    },

    height () {
      return this.parentHeight - this.top - this.bottom
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
    rawLeft (newLeft) {
      const bounds = this.bounds
      const aspectFactor = this.aspectFactor
      const lockAspectRatio = this.lockAspectRatio
      const left = this.left
      const top = this.top

      if (bounds.minLeft !== null && newLeft < bounds.minLeft) {
        newLeft = bounds.minLeft
      } else if (bounds.maxLeft !== null && bounds.maxLeft < newLeft) {
        newLeft = bounds.maxLeft
      }

      if (lockAspectRatio && this.resizingOnX) {
        this.rawTop = top - (left - newLeft) / aspectFactor
      }

      this.left = newLeft
    },
    rawRight (newRight) {
      const bounds = this.bounds
      const aspectFactor = this.aspectFactor
      const lockAspectRatio = this.lockAspectRatio
      const right = this.right
      const bottom = this.bottom

      if (bounds.minRight !== null && newRight < bounds.minRight) {
        newRight = bounds.minRight
      } else if (bounds.maxRight !== null && bounds.maxRight < newRight) {
        newRight = bounds.maxRight
      }

      if (lockAspectRatio && this.resizingOnX) {
        this.rawBottom = bottom - (right - newRight) / aspectFactor
      }

      this.right = newRight
    },
    rawTop (newTop) {
      const bounds = this.bounds
      const aspectFactor = this.aspectFactor
      const lockAspectRatio = this.lockAspectRatio
      const left = this.left
      const top = this.top

      if (bounds.minTop !== null && newTop < bounds.minTop) {
        newTop = bounds.minTop
      } else if (bounds.maxTop !== null && bounds.maxTop < newTop) {
        newTop = bounds.maxTop
      }

      if (lockAspectRatio && this.resizingOnY) {
        this.rawLeft = left - (top - newTop) * aspectFactor
      }

      this.top = newTop
    },
    rawBottom (newBottom) {
      const bounds = this.bounds
      const aspectFactor = this.aspectFactor
      const lockAspectRatio = this.lockAspectRatio
      const right = this.right
      const bottom = this.bottom

      if (bounds.minBottom !== null && newBottom < bounds.minBottom) {
        newBottom = bounds.minBottom
      } else if (bounds.maxBottom !== null && bounds.maxBottom < newBottom) {
        newBottom = bounds.maxBottom
      }

      if (lockAspectRatio && this.resizingOnY) {
        this.rawRight = right - (bottom - newBottom) * aspectFactor
      }

      this.bottom = newBottom
    },
    x () {
      if (this.resizing || this.dragging) {
        return
      }

      if (this.parent) {
        this.bounds = this.calcDragLimits()
      }

      const delta = this.x - this.left

      if (delta % this.grid[0] === 0) {
        this.rawLeft = this.x
        this.rawRight = this.right - delta
      }
    },
    y () {
      if (this.resizing || this.dragging) {
        return
      }

      if (this.parent) {
        this.bounds = this.calcDragLimits()
      }

      const delta = this.y - this.top

      if (delta % this.grid[1] === 0) {
        this.rawTop = this.y
        this.rawBottom = this.bottom - delta
      }
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
    w () {
      if (this.resizing || this.dragging) {
        return
      }

      if (this.parent) {
        this.bounds = this.calcResizeLimits()
      }

      const delta = this.width - this.w

      if (delta % this.grid[0] === 0) {
        this.rawRight = this.right + delta
      }
    },
    h () {
      if (this.resizing || this.dragging) {
        return
      }

      if (this.parent) {
        this.bounds = this.calcResizeLimits()
      }

      const delta = this.height - this.h

      if (delta % this.grid[1] === 0) {
        this.rawBottom = this.bottom + delta
      }
    }
  }
}
</script>
