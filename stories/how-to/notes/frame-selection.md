# Frame Selection

This is not a feature provided by the component by default, but it's an example of how you can build complex scenarios using existing features.

```js
      <vue-draggable-resizable
        class-name-active="my-active-class"
        v-for="element in elements"
        :style="selectStyle(element.isSelected)"
        :key="element.id"
        :x="element.x"
        :y="element.y"
        :w="element.w"
        :h="element.h"
        :resizable="false"
        @dragging="(left, top) => dragging(element.id, left, top)"
        @dragstop="(left, top) => dragstop(element.id, left, top)"
      >
        <p>{{ element.text }}</p>
      </vue-draggable-resizable>
```

Check the [source code](https://github.com/Xiao-Hongru/vue-draggable-resizable/tree/master/stories/how-to/frame-selection.js) to know the details of how it works.
