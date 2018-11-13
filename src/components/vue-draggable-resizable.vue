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
    @mousedown.stop="elmDown"
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
import { matchesSelectorToParentElements } from '../utils/dom' // 将选择器与父元素匹配

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
    },
    /* 定义组件是否开启冲突检测 */
    isConflictCheck: {
      type: Boolean, default: false
    },
    /* 是否开启元素对齐 */
    snap: {
      type: Boolean, default: false
    },
    /* 当调用对齐时，用来设置组件与组件之间的对齐距离，以像素为单位。 */
    snapTolerance: {
      type: Number,
      default: 5,
      validator: function (val) {
        return typeof val === 'number'
      }
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

    this.setSnap()
    this.setConflictCheck()
    this.getElmPosition()

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
      zIndex: this.z,
      /* 如果组件之间存在冲突，用来记录原位置信息 */
      restoreY: 0,
      restoreX: 0,
      restoreW: 0,
      restoreH: 0
    }
  },

  methods: {
    setSnap: function () {
      if (this.snap) {
        this.$el.setAttribute('data-is-snap', 'true')
      } else {
        this.$el.setAttribute('data-is-snap', 'false')
      }
    }, // 设置对齐元素
    snapCheck: function () {
      if (this.snap) {
        let p = this.$el.parentNode.childNodes // 获取当前父节点下所有子节点
        if (p.length > 1) {
          let x1 = this.left
          let x2 = this.left + this.width
          let y1 = this.top
          let y2 = this.top + this.height
          for (let i = 0; i < p.length; i++) {
            if (p[i] !== this.$el && p[i].className !== undefined && p[i].getAttribute('data-is-snap') !== 'false') {
              let l = p[i].offsetLeft // 对齐目标的left
              let r = l + p[i].offsetWidth // 对齐目标右侧距离窗口的left
              let t = p[i].offsetTop// 对齐目标的top
              let b = t + p[i].offsetHeight // 对齐目标右侧距离窗口的top

              let ts = Math.abs(t - y2) <= this.snapTolerance
              let bs = Math.abs(b - y1) <= this.snapTolerance
              let ls = Math.abs(l - x2) <= this.snapTolerance
              let rs = Math.abs(r - x1) <= this.snapTolerance
              if (ts) {
                this.top = t - this.height
              }
              if (bs) {
                this.top = b
              }
              if (ls) {
                this.left = l - this.width
              }
              if (rs) {
                this.left = r
              }
            }
          }
        }
      }
    }, // 检测对齐元素
    getElmPosition: function () {
      this.elmX = parseInt(this.$el.style.left)
      this.elmY = parseInt(this.$el.style.top)
      this.elmW = this.$el.offsetWidth || this.$el.clientWidth
      this.elmH = this.$el.offsetHeight || this.$el.clientHeight
    }, // 获得激活组件的位置信息
    setConflictCheck: function () {
      if (this.isConflictCheck) {
        this.$el.setAttribute('data-is-check', 'true')
      } else {
        this.$el.setAttribute('data-is-check', 'false')
      }
    }, // 设置冲突检测
    conflictCheck: function () {
      if (this.isConflictCheck) {
        let p = this.$el.parentNode.childNodes // 获取当前父节点下所有子节点
        if (p.length > 1) {
          for (let i = 0; i < p.length; i++) {
            if (p[i] !== this.$el && p[i].className !== undefined && p[i].getAttribute('data-is-check') !== 'false') {
              let tw = p[i].offsetWidth
              let th = p[i].offsetHeight
              let tl = p[i].offsetLeft
              let tt = p[i].offsetTop
              // 如果冲突，就将回退到移动前的位置
              if (this.top >= tt && this.left >= tl && tt + th > this.top && tl + tw > this.left ||
                this.top <= tt && this.left < tl && this.top + this.height > tt && this.left + this.width > tl) { /* 左上角与右下角重叠 */
                this.top = this.restoreY
                this.left = this.restoreX
                this.width = this.restoreW
                this.height = this.restoreH
              } else if (this.left <= tl && this.top >= tt && this.left + this.width > tl && this.top < tt + th ||
                this.top < tt && this.left > tl && this.top + this.height > tt && this.left < tl + tw) { /* 右上角与左下角重叠 */
                this.top = this.restoreY
                this.left = this.restoreX
                this.width = this.restoreW
                this.height = this.restoreH
              } else if (this.top < tt && this.left <= tl && this.top + this.height > tt && this.left + this.width > tl ||
                this.top > tt && this.left >= tl && this.top < tt + th && this.left < tl + tw) { /* 下边与上边重叠 */
                this.top = this.restoreY
                this.left = this.restoreX
                this.width = this.restoreW
                this.height = this.restoreH
              } else if (this.top <= tt && this.left >= tl && this.top + this.height > tt && this.left < tl + tw ||
                this.top >= tt && this.left <= tl && this.top < tt + th && this.left > tl + tw) { /* 上边与下边重叠（宽度不一样） */
                this.top = this.restoreY
                this.left = this.restoreX
                this.width = this.restoreW
                this.height = this.restoreH
              } else if (this.left >= tl && this.top >= tt && this.left < tl + tw && this.top < tt + th ||
                this.top > tt && this.left <= tl && this.left + this.width > tl && this.top < tt + th) { /* 左边与右边重叠 */
                this.top = this.restoreY
                this.left = this.restoreX
                this.width = this.restoreW
                this.height = this.restoreH
              } else if (this.top <= tt && this.left >= tl && this.top + this.height > tt && this.left < tl + tw ||
                this.top >= tt && this.left <= tl && this.top < tt + th && this.left + this.width > tl) { /* 左边与右边重叠（高度不一样） */
                this.top = this.restoreY
                this.left = this.restoreX
                this.width = this.restoreW
                this.height = this.restoreH
              }
            }
          }
        }
      }
    }, // 冲突检测
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
    }, // 检测尺寸
    elmDown: function (e) {
      const target = e.target || e.srcElement

      if (this.$el.contains(target)) {
        if (
          (this.dragHandle && !matchesSelectorToParentElements(target, this.dragHandle, this.$el)) ||
          (this.dragCancel && matchesSelectorToParentElements(target, this.dragCancel, this.$el))) {
          return
        }

        e.preventDefault()

        this.reviewDimensions()

        if (!this.enabled) {
          this.enabled = true

          this.$emit('activated')
          this.$emit('update:active', true)
        }
        // 激活区域块时获取当前区域块的X,Y,W,H
        this.getElmPosition()
        if (this.draggable) {
          this.dragging = true
          // 将移动前的位置存储
          this.restoreY = this.top
          this.restoreX = this.left
          this.restoreW = this.width
          this.restoreH = this.height
        }
      }
    }, // 鼠标激活当前组件
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
    }, // 取消激活
    handleDown: function (handle, e) {
      this.handle = handle

      if (e.stopPropagation) e.stopPropagation()
      if (e.preventDefault) e.preventDefault()

      // 当区域块处于被激活状态时，手柄被点击时获取当前区域块的X,Y,W,H（如果不加进来，会出现区域块会跳动到回退前的位置）
      this.getElmPosition()

      this.restoreY = this.top           // 将移动前的位置存储
      this.restoreX = this.left
      this.restoreW = this.width
      this.restoreH = this.height
      // END
      this.resizing = true
    }, // 鼠标按下控制点
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
    }, // 最大化
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
        this.snapCheck()
        this.$emit('dragging', this.left, this.top)
      }
    }, // 鼠标移动
    handleUp: function (e) {
      if (e.type.indexOf('touch') !== -1) {
        this.lastMouseX = e.changedTouches[0].clientX
        this.lastMouseY = e.changedTouches[0].clientY
      }
      this.handle = null
      if (this.resizing) {
        this.resizing = false
        this.conflictCheck() // 冲突检测
        this.$emit('resizestop', this.left, this.top, this.width, this.height)
      }
      if (this.dragging) {
        this.dragging = false
        this.conflictCheck() // 冲突检测
        this.$emit('dragstop', this.left, this.top)
      }

      this.elmX = this.left
      this.elmY = this.top
    } // 鼠标松开
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
    z-index: 999;
  }
  .handle-tl {
    top: -5px;
    left: -5px;
    cursor: nw-resize;
  }
  .handle-tm {
    top: -5px;
    left: 50%;
    margin-left: -5px;
    cursor: n-resize;
  }
  .handle-tr {
    top: -5px;
    right: -5px;
    cursor: ne-resize;
  }
  .handle-ml {
    top: 50%;
    margin-top: -5px;
    left: -5px;
    cursor: w-resize;
  }
  .handle-mr {
    top: 50%;
    margin-top: -5px;
    right: -5px;
    cursor: e-resize;
  }
  .handle-bl {
    bottom: -5px;
    left: -5px;
    cursor: sw-resize;
  }
  .handle-bm {
    bottom: -5px;
    left: 50%;
    margin-left: -5px;
    cursor: s-resize;
  }
  .handle-br {
    bottom: -5px;
    right: -5px;
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
