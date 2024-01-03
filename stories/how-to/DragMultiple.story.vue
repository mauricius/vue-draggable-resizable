<script>
import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'
import '@/components/vue-draggable-resizable.css'

import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    VueDraggableResizable,
  },
  data() {
    return {
      sync: false,
      draggingId: null,
      prevOffsetX: 0,
      prevOffsetY: 0,
      elements: [
        {id: 1, x: 0, y: 0, text: 'Element 1'},
        {id: 2, x: 200, y: 200, text: 'Element 2'}
      ]
    }
  },
  mounted() {
    window.addEventListener('keydown', ev => {
      if (ev.keyCode === 17) {
        this.sync = true;
      }
    });
    window.addEventListener('keyup', ev => {
      if (ev.keyCode === 17) {
        this.sync = false;
      }
    });
  },
  methods: {
    dragging(id, left, top) {
      this.draggingId = id;

      if (! this.sync) return;

      const offsetX = left - this.draggingElement.x;
      const offsetY = top - this.draggingElement.y;

      const deltaX = this.deltaX(offsetX);
      const deltaY = this.deltaY(offsetY);

      this.elements.map(el => {
        if (el.id !== id) {
          el.x += deltaX;
          el.y += deltaY;
        }

        return el;
      });
    },
    dragstop(id, left, top) {
      this.elements.map(el => {
        if (el.id === id) {
          el.x = left;
          el.y = top;
        }

        return el;
      });

      this.draggingId = null;
      this.prevOffsetX = 0;
      this.prevOffsetY = 0;
    },
    deltaX(offsetX) {
      const ret = offsetX - this.prevOffsetX;

      this.prevOffsetX = offsetX;

      return ret;
    },
    deltaY(offsetY) {
      const ret = offsetY - this.prevOffsetY;

      this.prevOffsetY = offsetY;

      return ret;
    }
  },
  computed: {
    draggingElement: function () {
      if (! this.draggingId) return;

      return this.elements.find(el => el.id === this.draggingId);
    }
  }
})
</script>

<template>
  <Story auto-props-disabled title="Drag Multiple Elements">
    <vue-draggable-resizable
      class-name-active="my-active-class"
      v-for="element in elements"
      :key="element.id"
      :x="element.x"
      :y="element.y"
      :w="200"
      :h="200"
      :resizable="false"
      @dragging="(left, top) => dragging(element.id, left, top)"
      @dragstop="(left, top) => dragstop(element.id, left, top)"
    >
      <p>{{ element.text }}</p>
    </vue-draggable-resizable>

    <template #controls>
      <HstCheckbox v-model="sync" title="Synchronize" />
    </template>
  </Story>
</template>

<docs lang="md">
  ## Drag Multiple Elements

  This is not a feature provided by the component by default, but it's an example of how you can build complex scenarios using existing features.

  Make sure to click anywhere inside the container before starting to drag elements, due to how the ctrl event handler is registered.
</docs>
