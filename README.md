<p align="center"><img src="http://tingtas.com/vue-draggable-resizable/resources/logo.png" alt="logo"></p>
<h1 align="center">VueDraggableResizable</h1>

[![Latest Version on NPM](https://img.shields.io/npm/v/vue-draggable-resizable.svg?style=flat-square)](https://npmjs.com/package/vue-draggable-resizable)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![npm](https://img.shields.io/npm/dt/vue-draggable-resizable.svg?style=flat-square)](https://www.npmjs.com/package/vue-draggable-resizable)

> Vue 用于可调整大小和可拖动元素的组件并支持组件之间的冲突检测与组件对齐

## 更新2.0版本

> 说明：组件基于[vue-draggable-resizable](https://github.com/mauricius/vue-draggable-resizable)进行二次开发

距离上[1.7版本](https://github.com/gorkys/vue-draggable-resizable)版本的修改已经过去快一年的时间了，原版组件在之前已经更新到了2.0版本。

虽然之前适配过旧版组件，但是因为2.0版本原作者对代码进行了重构，原来修改的代码照搬是不可能的了。

所以也就一直没有将**冲突检测**以及**吸附对齐**功能适配到2.0版本，最近正好有时间就适配一下。

**新增特征**

- 冲突检测
- 吸附对齐
- 默认样式优化

## 功能预览

![](https://cdn.jsdelivr.net/gh/gorkys/CDN-Blog@master/Project/vue-draggable-resizable/demo.gif)

## 项目地址

<https://github.com/gorkys/vue-draggable-resizable-gorkys>

> 如果喜欢该项目，欢迎**Star**

## 增加冲突检测与元素对齐
### Props
**isConflictCheck**<br>
Type: `Boolean`<br>
Required: `false`<br>
Default: `false`

定义组件是否开启冲突检测。

```html
<vue-draggable-resizable :is-conflict-check="true">
```
**snap**<br>
Type: `Boolean`<br>
Required: `false`<br>
Default: `false`

定义组件是否开启元素对齐。

```html
<vue-draggable-resizable :snap="true">
```
**snapTolerance**<br>
Type: `Number`<br>
Required: `false`<br>
Default: `5`

当调用`snap`时，定义组件与元素之间的对齐距离，以像素为单位。

```html
<vue-draggable-resizable :snap="true" :snap-tolerance="20">
```
## 安装新版本

```bash
$ npm install --save vue-draggable-resizable-gorkys
```

---
## 原组件文档翻译
## 安装和基本用法

```bash
$ npm install --save vue-draggable-resizable
```


注册组件

```js
import Vue from 'vue'
import VueDraggableResizable from 'vue-draggable-resizable'

Vue.component('vue-draggable-resizable', VueDraggableResizable)
```

现在可以在标记中使用该组件

```vue
<template>
  <div style="height: 500px; width: 500px; border: 1px solid red; position: relative;">
    <vue-draggable-resizable :w="100" :h="100" v-on:dragging="onDrag" v-on:resizing="onResize" :parent="true">
      <p>Hello! I'm a flexible component. You can drag me around and you can resize me.<br>
      X: {{ x }} / Y: {{ y }} - Width: {{ width }} / Height: {{ height }}</p>
    </vue-draggable-resizable>
  </div>
</template>

<script>
import VueDraggableResizable from 'vue-draggable-resizable'

export default {
  data: function () {
    return {
      width: 0,
      height: 0,
      x: 0,
      y: 0
    }
  },
  methods: {
    onResize: function (x, y, width, height) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
    },
    onDrag: function (x, y) {
      this.x = x
      this.y = y
    }
  }
}
</script>
```

### Props

#### active
Type: `Boolean`<br>
Required: `false`<br>
Default: `false`

确定组件是否应处于活动状态。 `prop`对更改做出反应，也可以与`sync`[modifier](https://vuejs.org/v2/guide/components.html#sync-Modifier) 一起使用以保持状态与父级同步。

```html
<vue-draggable-resizable :active="true">
```

#### draggable
Type: `Boolean`<br>
Required: `false`<br>
Default: `true`

定义组件应该是否可拖动。

```html
<vue-draggable-resizable :draggable="false">
```

#### resizable
Type: `Boolean`<br>
Required: `false`<br>
Default: `true`

定义组件是否可以调整大小。

```html
<vue-draggable-resizable :resizable="false">
```

#### w
Type: `Number`<br>
Required: `false`<br>
Default: `200`

定义元素的初始宽度。

```html
<vue-draggable-resizable :w="200">
```

#### h
Type: `Number`<br>
Required: `false`<br>
Default: `200`

定义元素的初始高度。

```html
<vue-draggable-resizable :h="200">
```

#### minw
Type: `Number`<br>
Required: `false`<br>
Default: `50`

定义元素的最小宽度。

```html
<vue-draggable-resizable :minw="50">
```

#### minh
Type: `Number`<br>
Required: `false`<br>
Default: `50`

定义元素的最小高度。

```html
<vue-draggable-resizable :minh="50">
```

#### x
Type: `Number`<br>
Required: `false`<br>
Default: `0`

定义元素的初始x位置。

```html
<vue-draggable-resizable :x="0">
```

#### y
Type: `Number`<br>
Required: `false`<br>
Default: `0`

定义元素的初始y位置。

```html
<vue-draggable-resizable :y="0">
```

#### z
Type: `Number|String`<br>
Required: `false`<br>
Default: `auto`

定义元素的zIndex。

```html
<vue-draggable-resizable :z="999">
```

#### handles
Type: `Array`<br>
Required: `false`<br>
Default: `['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml']`

定义句柄数组以限制元素大小调整：
* `tl` - 左上角
* `tm` - 中上方
* `tr` - 右上角
* `mr` - 右中方
* `br` - 右下角
* `bm` - 下中方
* `bl` - 左下方
* `ml` - 左中方

```html
<vue-draggable-resizable :handles="['tm','bm','ml','mr']">
```

#### axis
Type: `String`<br>
Required: `false`<br>
Default: `both`

定义元素可拖动的轴。可用值为`x`, `y` 或者 `both`.

```html
<vue-draggable-resizable axis="x">
```

#### grid
Type: `Array`<br>
Required: `false`<br>
Default: `[1,1]`

定义捕捉元素的网格。
```html
<vue-draggable-resizable :grid="[1,1]">
```

#### parent
Type: `Boolean`<br>
Required: `false`<br>
Default: `false`

将元素的移动和尺寸限制为父元素。

```html
<vue-draggable-resizable :parent="true">
```

#### dragHandle
Type: `String`<br>
Required: `false`

定义应该用于拖动组件的选择器。

```html
<vue-draggable-resizable drag-handle=".drag">
```

#### dragCancel
Type: `String`<br>
Required: `false`

定义应该用于阻止拖动初始化的选择器。

```html
<vue-draggable-resizable drag-cancel=".drag">
```

#### maximize
Type: `Boolean`<br>
Required: `false`<br>
Default: `false`

如果设置为true，则允许组件在双击时填充其父级。

```html
<vue-draggable-resizable :maximize="true">
```

---

### Events

#### activated

Required: `false`<br>
Parameters: `-`

单击组件时调用，以显示句柄。

```html
<vue-draggable-resizable @activated="onActivated">
```

#### deactivated

Required: `false`<br>
Parameters: `-`

每当用户单击组件外的任何位置时调用，以便停用它。

```html
<vue-draggable-resizable @deactivated="onDeactivated">
```

#### resizing

Required: `false`<br>
Parameters:
* `left`元素的X位置
* `top` 元素的Y位置
* `width`元素的宽度
* `height` 元素的高度

每当组件调整大小时调用。

```html
<vue-draggable-resizable @resizing="onResizing">
```

#### resizestop

Required: `false`<br>
Parameters:
* `left` 元素的X位置
* `top` 元素的Y位置
* `width` 元素的宽度
* `height` 元素的高度

每当组件停止调整大小时调用。

```html
<vue-draggable-resizable @resizestop="onResizstop">
```

#### dragging

Required: `false`<br>
Parameters:
* `left` 元素的X位置
* `top` 元素的Y位置

每当拖动组件时调用。

```html
<vue-draggable-resizable @dragging="onDragging">
```

#### dragstop

Required: `false`<br>
Parameters:
* `left`元素的X位置
* `top` 元素的Y位置

每当组件停止拖动时调用。

```html
<vue-draggable-resizable @dragstop="onDragstop">
```

### Gotchas

如果要在其父元素中限制组件，请小心使用x，y，w，h，minh和minh props的适当值。

### Bonus

如果 `resizing`, `parent` 和`maximize`道具 为`true` ，您可以双击元素以使其填充父级。
