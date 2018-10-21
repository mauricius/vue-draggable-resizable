<p align="center"><img src="https://rawgit.com/mauricius/vue-draggable-resizable/master/docs/resources/logo.png" alt="logo"></p>
<h1 align="center">VueDraggableResizable</h1>

[![Latest Version on NPM](https://img.shields.io/npm/v/vue-draggable-resizable.svg?style=flat-square)](https://npmjs.com/package/vue-draggable-resizable)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)
[![npm](https://img.shields.io/npm/dt/vue-draggable-resizable.svg?style=flat-square)](https://www.npmjs.com/package/vue-draggable-resizable)

> Vue2 Component for draggable and resizable elements.

## Table of Contents

* [Features](#features)
* [Demo](#demo)
* [Install and basic usage](#install-and-basic-usage)
  * [Props](#props)
  * [Events](#events)
* [Gotchas](#gotchas)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)

### Features

* No dependencies
* Use draggable, resizable or both
* Define handles for resizing
* Restrict size and movement to parent element
* Snap element to custom grid
* Restrict drag to vertical or horizontal axis

### Demo

[Demo](https://mauricius.github.io/vue-draggable-resizable/)

---

## Install and basic usage

```bash
$ npm install --save vue-draggable-resizable
```


Register the component

```js
import Vue from 'vue'
import VueDraggableResizable from 'vue-draggable-resizable'

Vue.component('vue-draggable-resizable', VueDraggableResizable)
```

You may now use the component in your markup

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

Determines if the component should be active or not. The prop reacts to changes and also can be used with the `sync`[modifier](https://vuejs.org/v2/guide/components.html#sync-Modifier) to keep the state in sync with the parent.

```html
<vue-draggable-resizable :active="true">
```

#### draggable
Type: `Boolean`<br>
Required: `false`<br>
Default: `true`

Defines it the component should be draggable or not.

```html
<vue-draggable-resizable :draggable="false">
```

#### resizable
Type: `Boolean`<br>
Required: `false`<br>
Default: `true`

Defines it the component should be resizable or not.

```html
<vue-draggable-resizable :resizable="false">
```

#### w
Type: `Number`<br>
Required: `false`<br>
Default: `200`

Define the initial width of the element.

```html
<vue-draggable-resizable :w="200">
```

#### h
Type: `Number`<br>
Required: `false`<br>
Default: `200`

Define the initial height of the element.

```html
<vue-draggable-resizable :h="200">
```

#### minw
Type: `Number`<br>
Required: `false`<br>
Default: `50`

Define the minimal width of the element.

```html
<vue-draggable-resizable :minw="50">
```

#### minh
Type: `Number`<br>
Required: `false`<br>
Default: `50`

Define the minimal height of the element.

```html
<vue-draggable-resizable :minh="50">
```

#### x
Type: `Number`<br>
Required: `false`<br>
Default: `0`

Define the initial x position of the element.

```html
<vue-draggable-resizable :x="0">
```

#### y
Type: `Number`<br>
Required: `false`<br>
Default: `0`

Define the initial y position of the element.

```html
<vue-draggable-resizable :y="0">
```

#### z
Type: `Number|String`<br>
Required: `false`<br>
Default: `auto`

Define the zIndex of the element.

```html
<vue-draggable-resizable :z="999">
```

#### handles
Type: `Array`<br>
Required: `false`<br>
Default: `['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml']`

Define the array of handles to restrict the element resizing:
* `tl` - Top left
* `tm` - Top middle
* `tr` - Top right
* `mr` - Middle right
* `br` - Bottom right
* `bm` - Bottom middle
* `bl` - Bottom left
* `ml` - Middle left

```html
<vue-draggable-resizable :handles="['tm','bm','ml','mr']">
```

#### axis
Type: `String`<br>
Required: `false`<br>
Default: `both`

Define the axis on which the element is draggable. Available values are `x`, `y` or `both`.

```html
<vue-draggable-resizable axis="x">
```

#### grid
Type: `Array`<br>
Required: `false`<br>
Default: `[1,1]`

Define the grid on which the element is snapped.

```html
<vue-draggable-resizable :grid="[1,1]">
```

#### parent
Type: `Boolean`<br>
Required: `false`<br>
Default: `false`

Restricts the movement and the dimensions of the element to the parent.

```html
<vue-draggable-resizable :parent="true">
```

#### dragHandle
Type: `String`<br>
Required: `false`

Defines the selector that should be used to drag the component.

```html
<vue-draggable-resizable drag-handle=".drag">
```

#### dragCancel
Type: `String`<br>
Required: `false`

Defines a selector that should be used to prevent drag initialization.

```html
<vue-draggable-resizable drag-cancel=".drag">
```

#### maximize
Type: `Boolean`<br>
Required: `false`<br>
Default: `false`

If set to `true` allows the component to fill its parent when double-clicked.

```html
<vue-draggable-resizable :maximize="true">
```

---

### Events

#### activated

Required: `false`<br>
Parameters: `-`

Called whenever the component gets clicked, in order to show handles.

```html
<vue-draggable-resizable @activated="onActivated">
```

#### deactivated

Required: `false`<br>
Parameters: `-`

Called whenever the user clicks anywhere outside the component, in order to deactivate it.

```html
<vue-draggable-resizable @deactivated="onDeactivated">
```

#### resizing

Required: `false`<br>
Parameters:
* `left` the X position of the element
* `top` the Y position of the element
* `width` the width of the element
* `height` the height of the element

Called whenever the component gets resized.

```html
<vue-draggable-resizable @resizing="onResizing">
```

#### resizestop

Required: `false`<br>
Parameters:
* `left` the X position of the element
* `top` the Y position of the element
* `width` the width of the element
* `height` the height of the element

Called whenever the component stops getting resized.

```html
<vue-draggable-resizable @resizestop="onResizstop">
```

#### dragging

Required: `false`<br>
Parameters:
* `left` the X position of the element
* `top` the Y position of the element

Called whenever the component gets dragged.

```html
<vue-draggable-resizable @dragging="onDragging">
```

#### dragstop

Required: `false`<br>
Parameters:
* `left` the X position of the element
* `top` the Y position of the element

Called whenever the component stops getting dragged.

```html
<vue-draggable-resizable @dragstop="onDragstop">
```

### Gotchas

Be careful to use appropriate values for `x`, `y`, `w`, `h`, `minh` and `minh` props when you want to restrict the component in its parent element.

If you have contents inside a component that shall be selectable or get the
window's focus (e.g. `input` elements), use the [`dragHandle`](#draghandle)
property to explicitly define the draggable area or [`dragCancel`](#dragCancel)
to exclude elements from being so.

### Bonus

If `resizing`, `parent` and `maximize` props are `true` you can double-click on the element to make it fill the parent.

## Roadmap

- [x] Touch support (thanks @ojczeo)
- [x] Fix grid issues (#34, #58) - Version 2
- [x] Implement Storybook - Version 2
- [x] Aspect ratio on resizing (#26) - Version 2
- [ ] `maxWidth` and `maxHeight` props (#76) - In progress
- [x] Different approach with CSS styles (#73) - Version 2
- [x] Watching props for changes (requires refactoring and possibly breaking changes) - Version 2

## Contributing

Any contribution to the code or any part of the documentation and any idea and/or suggestion are very welcome.

``` bash
# serve with hot reload at localhost:8080
npm run dev

# distribution build
npm run build

# build the docs into gh-pages
npm run docs

# run unit tests
npm run test

```

## License

[MIT license](LICENSE)
