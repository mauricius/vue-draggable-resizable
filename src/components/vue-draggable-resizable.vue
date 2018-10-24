<template>
  <div
    class="vdr"
    :style="style"
    :class="{
      draggable: draggable,
      resizable: resizable,
      active: enabled,
      dragging: dragging,
      resizing: resizing
    }"
    @mousedown="elmDown"
    @touchstart.stop="elmDown"
    @dblclick="fillParent"
  >
    <div
      v-for="handle in handles"
      v-if="resizable"
      class="handle"
      :key="handle"
      :class="'handle-' + handle"
      :style="{ display: enabled ? 'block' : 'none'}"
      @mousedown.stop.prevent="handleDown(handle, $event)"
      @touchstart.stop.prevent="handleDown(handle, $event)"
    ></div>
    <slot></slot>
  </div>
</template>

<script>
import { matchesSelectorToParentElements } from '../utils/dom'

export default {
  replace: true,
  name: 'VueDraggableResizable',
  props: {
    active: {
      type: Boolean, default: false
    },
    draggable: {
      type: Boolean, default: true
    },
    resizable: {
      type: Boolean, default: true
    },
    w: {
      type: Number,
      default: 200,
      validator: function (val) {
        return val > 0
      }
    },
    h: {
      type: Number,
      default: 200,
      validator: function (val) {
        return val > 0
      }
    },
    minw: {
      type: Number,
      default: 50,
      validator: function (val) {
        return val >= 0
      }
    },
    minh: {
      type: Number,
      default: 50,
      validator: function (val) {
        return val >= 0
      }
    },
    x: {
      type: Number,
      default: 0,
      validator: function (val) {
        return typeof val === 'number'
      }
    },
    y: {
      type: Number,
      default: 0,
      validator: function (val) {
        return typeof val === 'number'
      }
    },
    z: {
      type: [ String, Number ],
      default: 'auto',
      validator: function (val) {
        let valid = (typeof val === 'string') ? val === 'auto' : val >= 0
        return valid
      }
    },
    handles: {
      type: Array,
      default: function () {
        return ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml']
      },
      validator: function (val) {
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
      validator: function (val) {
        return ['x', 'y', 'both'].indexOf(val) !== -1
      }
    },
    grid: {
      type: Array,
      default: function () {
        return [1, 1]
      }
    },
    parent: {
      type: Boolean, default: false
    },
    maximize: {
      type: Boolean, default: false
    }
  },

  created: function () {
    this.parentX = 0
    this.parentW = 9999
    this.parentY = 0
    this.parentH = 9999

    this.mouseX = 0
    this.mouseY = 0

    this.lastMouseX = 0
    this.lastMouseY = 0

    this.mouseOffX = 0
    this.mouseOffY = 0

    this.elmX = 0
    this.elmY = 0

    this.elmW = 0
    this.elmH = 0
  },
  mounted: function () {
    document.documentElement.addEventListener('mousemove', this.handleMove, true)
    document.documentElement.addEventListener('mousedown', this.deselect, true)
    document.documentElement.addEventListener('mouseup', this.handleUp, true)

    // touch events bindings
    document.documentElement.addEventListener('touchmove', this.handleMove, true)
    document.documentElement.addEventListener('touchend touchcancel', this.deselect, true)
    document.documentElement.addEventListener('touchstart', this.handleUp, true)

    this.elmX = parseInt(this.$el.style.left)
    this.elmY = parseInt(this.$el.style.top)
    this.elmW = this.$el.offsetWidth || this.$el.clientWidth
    this.elmH = this.$el.offsetHeight || this.$el.clientHeight

    this.reviewDimensions()
  },
  beforeDestroy: function () {
    document.documentElement.removeEventListener('mousemove', this.handleMove, true)
    document.documentElement.removeEventListener('mousedown', this.deselect, true)
    document.documentElement.removeEventListener('mouseup', this.handleUp, true)

    // touch events bindings removed
    document.documentElement.addEventListener('touchmove', this.handleMove, true)
    document.documentElement.addEventListener('touchend touchcancel', this.deselect, true)
    document.documentElement.addEventListener('touchstart', this.handleUp, true)
  },

  data: function () {
    return {
      top: this.y,
      left: this.x,
      width: this.w,
      height: this.h,
      resizing: false,
      dragging: false,
      enabled: this.active,
      handle: null,
      zIndex: this.z
    }
  },

  methods: {
    reviewDimensions: function () {
      if (this.minw > this.w) this.width = this.minw

      if (this.minh > this.h) this.height = this.minh

      if (this.parent) {
        const parentW = parseInt(this.$el.parentNode.clientWidth, 10)
        const parentH = parseInt(this.$el.parentNode.clientHeight, 10)

        this.parentW = parentW
        this.parentH = parentH

        if (this.w > this.parentW) this.width = parentW

        if (this.h > this.parentH) this.height = parentH

        if ((this.x + this.w) > this.parentW) this.width = parentW - this.x

        if ((this.y + this.h) > this.parentH) this.height = parentH - this.y
      }

      this.elmW = this.width
      this.elmH = this.height

      this.$emit('resizing', this.left, this.top, this.width, this.height)
    },
    elmDown: function (e) {
      const target = e.target || e.srcElement

      if (this.$el.contains(target)) {
        if (
          (this.dragHandle && !matchesSelectorToParentElements(target, this.dragHandle, this.$el)) ||
          (this.dragCancel && matchesSelectorToParentElements(target, this.dragCancel, this.$el))) {
          return
        }

        e.stopPropagation()
        e.preventDefault()

        this.reviewDimensions()

        if (!this.enabled) {
          this.enabled = true

          this.$emit('activated')
          this.$emit('update:active', true)
        }

        if (this.draggable) {
          this.dragging = true
        }
      }
    },
    deselect: function (e) {
      if (e.type.indexOf('touch') !== -1) {
        this.mouseX = e.changedTouches[0].clientX
        this.mouseY = e.changedTouches[0].clientY
      } else {
        this.mouseX = e.pageX || e.clientX + document.documentElement.scrollLeft
        this.mouseY = e.pageY || e.clientY + document.documentElement.scrollTop
      }

      this.lastMouseX = this.mouseX
      this.lastMouseY = this.mouseY

      const target = e.target || e.srcElement
      const regex = new RegExp('handle-([trmbl]{2})', '')

      if (!this.$el.contains(target) && !regex.test(target.className)) {
        if (this.enabled) {
          this.enabled = false

          this.$emit('deactivated')
          this.$emit('update:active', false)
        }
      }
    },
    handleDown: function (handle, e) {
      this.handle = handle

      if (e.stopPropagation) e.stopPropagation()
      if (e.preventDefault) e.preventDefault()

      this.resizing = true
    },
    fillParent: function (e) {
      if (!this.parent || !this.resizable || !this.maximize) return

      let done = false

      const animate = () => {
        if (!done) {
          window.requestAnimationFrame(animate)
        }

        if (this.axis === 'x') {
          if (
            this.width === this.parentW && this.left === this.parentX
          ) done = true
        } else if (this.axis === 'y') {
          if (
            this.height === this.parentH && this.top === this.parentY
          ) done = true
        } else if (this.axis === 'both') {
          if (
            this.width === this.parentW &&
            this.height === this.parentH &&
            this.top === this.parentY &&
            this.left === this.parentX
          ) done = true
        }

        if (this.axis === 'x' || this.axis === 'both') {
          if (this.width < this.parentW) {
            this.width++
            this.elmW++
          }

          if (this.left > this.parentX) {
            this.left--
            this.elmX--
          }
        }

        if (this.axis === 'y' || this.axis === 'both') {
          if (this.height < this.parentH) {
            this.height++
            this.elmH++
          }

          if (this.top > this.parentY) {
            this.top--
            this.elmY--
          }
        }

        this.$emit('resizing', this.left, this.top, this.width, this.height)
      }

      window.requestAnimationFrame(animate)
    },
    handleMove: function (e) {
      const isTouchMove = e.type.indexOf('touchmove') !== -1
      this.mouseX = isTouchMove
        ? e.touches[0].clientX
        : e.pageX || e.clientX + document.documentElement.scrollLeft
      this.mouseY = isTouchMove
        ? e.touches[0].clientY
        : e.pageY || e.clientY + document.documentElement.scrollTop

      let diffX = this.mouseX - this.lastMouseX + this.mouseOffX
      let diffY = this.mouseY - this.lastMouseY + this.mouseOffY

      this.mouseOffX = this.mouseOffY = 0

      this.lastMouseX = this.mouseX
      this.lastMouseY = this.mouseY

      let dX = diffX
      let dY = diffY

      if (this.resizing) {
        if (this.handle.indexOf('t') >= 0) {
          if (this.elmH - dY < this.minh) this.mouseOffY = (dY - (diffY = this.elmH - this.minh))
          else if (this.parent && this.elmY + dY < this.parentY) this.mouseOffY = (dY - (diffY = this.parentY - this.elmY))
          this.elmY += diffY
          this.elmH -= diffY
        }

        if (this.handle.indexOf('b') >= 0) {
          if (this.elmH + dY < this.minh) this.mouseOffY = (dY - (diffY = this.minh - this.elmH))
          else if (this.parent && this.elmY + this.elmH + dY > this.parentH) this.mouseOffY = (dY - (diffY = this.parentH - this.elmY - this.elmH))
          this.elmH += diffY
        }

        if (this.handle.indexOf('l') >= 0) {
          if (this.elmW - dX < this.minw) this.mouseOffX = (dX - (diffX = this.elmW - this.minw))
          else if (this.parent && this.elmX + dX < this.parentX) this.mouseOffX = (dX - (diffX = this.parentX - this.elmX))
          this.elmX += diffX
          this.elmW -= diffX
        }

        if (this.handle.indexOf('r') >= 0) {
          if (this.elmW + dX < this.minw) this.mouseOffX = (dX - (diffX = this.minw - this.elmW))
          else if (this.parent && this.elmX + this.elmW + dX > this.parentW) this.mouseOffX = (dX - (diffX = this.parentW - this.elmX - this.elmW))
          this.elmW += diffX
        }

        this.left = (Math.round(this.elmX / this.grid[0]) * this.grid[0])
        this.top = (Math.round(this.elmY / this.grid[1]) * this.grid[1])

        this.width = (Math.round(this.elmW / this.grid[0]) * this.grid[0])
        this.height = (Math.round(this.elmH / this.grid[1]) * this.grid[1])

        this.$emit('resizing', this.left, this.top, this.width, this.height)
      } else if (this.dragging) {
        if (this.parent) {
          if (this.elmX + dX < this.parentX) this.mouseOffX = (dX - (diffX = this.parentX - this.elmX))
          else if (this.elmX + this.elmW + dX > this.parentW) this.mouseOffX = (dX - (diffX = this.parentW - this.elmX - this.elmW))

          if (this.elmY + dY < this.parentY) this.mouseOffY = (dY - (diffY = this.parentY - this.elmY))
          else if (this.elmY + this.elmH + dY > this.parentH) this.mouseOffY = (dY - (diffY = this.parentH - this.elmY - this.elmH))
        }

        this.elmX += diffX
        this.elmY += diffY

        if (this.axis === 'x' || this.axis === 'both') {
          this.left = (Math.round(this.elmX / this.grid[0]) * this.grid[0])
        }
        if (this.axis === 'y' || this.axis === 'both') {
          this.top = (Math.round(this.elmY / this.grid[1]) * this.grid[1])
        }

        this.$emit('dragging', this.left, this.top)
      }
    },
    handleUp: function (e) {
      if (e.type.indexOf('touch') !== -1) {
        this.lastMouseX = e.changedTouches[0].clientX
        this.lastMouseY = e.changedTouches[0].clientY
      }
      this.handle = null
      if (this.resizing) {
        this.resizing = false
        this.$emit('resizestop', this.left, this.top, this.width, this.height)
      }
      if (this.dragging) {
        this.dragging = false
        this.$emit('dragstop', this.left, this.top)
      }

      this.elmX = this.left
      this.elmY = this.top
    }
  },

  computed: {
    style: function () {
      return {
        top: this.top + 'px',
        left: this.left + 'px',
        width: this.width + 'px',
        height: this.height + 'px',
        zIndex: this.zIndex
      }
    }
  },

  watch: {
    active: function (val) {
      this.enabled = val
    },
    z: function (val) {
      if (val >= 0 || val === 'auto') {
        this.zIndex = val
      }
    }
  }
}
</script>

<style scoped>
  .vdr {
    position: absolute;
    box-sizing: border-box;
  }
  .handle {
    box-sizing: border-box;
    display: none;
    position: absolute;
    width: 10px;
    height: 10px;
    font-size: 1px;
    background: #EEE;
    border: 1px solid #333;
  }
  .handle-tl {
    top: -10px;
    left: -10px;
    cursor: nw-resize;
  }
  .handle-tm {
    top: -10px;
    left: 50%;
    margin-left: -5px;
    cursor: n-resize;
  }
  .handle-tr {
    top: -10px;
    right: -10px;
    cursor: ne-resize;
  }
  .handle-ml {
    top: 50%;
    margin-top: -5px;
    left: -10px;
    cursor: w-resize;
  }
  .handle-mr {
    top: 50%;
    margin-top: -5px;
    right: -10px;
    cursor: e-resize;
  }
  .handle-bl {
    bottom: -10px;
    left: -10px;
    cursor: sw-resize;
  }
  .handle-bm {
    bottom: -10px;
    left: 50%;
    margin-left: -5px;
    cursor: s-resize;
  }
  .handle-br {
    bottom: -10px;
    right: -10px;
    cursor: se-resize;
  }
  @media only screen and (max-width: 768px) {
    /* For mobile phones: */
    [class*="handle-"]:before {
      content: '';
      left: -10px;
      right: -10px;
      bottom: -10px;
      top: -10px;
      position: absolute;
    }
  }
</style>
