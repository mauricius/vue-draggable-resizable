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
      draggingId: null,
      prevOffsetX: 0,
      prevOffsetY: 0,
      elements: [
        {id: 1, x: 10, y: 10, w: 200, h: 200, isSelect: false, text: 'Element 1'},
        {id: 2, x: 250, y: 200, w: 200, h: 200, isSelect: false, text: 'Element 2'},
        {id: 3, x: 500, y: 300, w: 200, h: 200, isSelect: false, text: 'Element 3'}
      ],
      //frame selection
      selectedItemNum:0,
      startX: 0, //X of the mouse (begin to move)
      startY: 0,
      initX: 0, //X of the mouse (moving)
      initY: 0,
      scrollX: 0,
      scrollY: 0,
      rectX: 0, //X of the rectangle selection
      rectY: 0,
      rectWidth: 0, //width of the rectangle selection
      rectHeight: 0,
      rectShow: false, //weather to show the rectangle selection
    }
  },
  methods: {
    dragging(id, left, top) {
      this.draggingId = id;

      const offsetX = left - this.draggingElement.x;
      const offsetY = top - this.draggingElement.y;

      const deltaX = this.deltaX(offsetX);
      const deltaY = this.deltaY(offsetY);

      // if the dragging element is not been selected,clear all selected elements
      if(this.draggingElement.isSelected===false){
        this.elements.map((el) => { el.isSelected = false; });
        this.selectedItemNum=0;
        return;
      };
      this.elements.map(el => {
        if (el.id !== id && el.isSelected===true) {
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
    },
    mouseDown(e) {
      if (e.target.id !== 'components-container') {
        return;
      }
      //clear all selected elements
      if (this.selectedItemNum > 0) {
        this.elements.map((el) => { el.isSelected = false; });
        this.selectedItemNum=0;
      }
      this.rectSelect = true;//begin to draw the rectangle
      this.rectWidth =0;
      this.rectHeight=0;
      this.startX = e.offsetX;
      this.startY = e.offsetY;
      this.scrollX = e.clientX - e.offsetX;
      this.scrollY = e.clientY - e.offsetY;
    },

    mouseMove(e) {
      if (!this.rectSelect) {
        return;
      }
      this.rectShow = true;
      this.initX = e.clientX - this.scrollX;
      this.initY = e.clientY - this.scrollY;
      this.rectX = Math.min(this.initX, this.startX);
      this.rectY = Math.min(this.initY, this.startY);
      this.rectWidth = Math.abs(this.initX - this.startX);
      this.rectHeight = Math.abs(this.initY - this.startY);
      this.clearBubble(e);
    },
    mouseUpfn(e) {
      if (this.rectSelect) {
        if (this.rectWidth > 10 && this.rectHeight > 10) {
          this.elements.map((el)=>{
            const elLeft=el.x;
            const elRight=el.x+el.w;
            const elTop=el.y;
            const elBottom=el.y+el.h;
            if (elLeft > this.rectX && elTop > this.rectY && (elRight < (this.rectX + this.rectWidth)) && (elBottom < (this.rectY + this.rectHeight))) {
              el.isSelected = true;
              this.selectedItemNum+=1;
            }
          });
        }
        this.rectShow = false;
        this.rectSelect = false;
        this.clearBubble(e);
      }
    },
    clearBubble(e) {
      if (e.stopPropagation) {
        e.stopPropagation();
      } else {
        e.cancelBubble = true;
      }
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnValue = false;
      }
    },
    selectStyle(isSelected) {
      return isSelected? "border:1px solid blue !important" :null;
    }
  },
  computed: {
    draggingElement: function () {
      if (! this.draggingId) return;
      return this.elements.find(el => el.id === this.draggingId);
    },
  }
})
</script>

<template>
  <Story auto-props-disabled title="Frame Selection">
    <div
      id="components-container"
      @mousedown="mouseDown"
      @mouseup="mouseUpfn"
      @mousemove="mouseMove">
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
      <div
        :style="{width: rectWidth + 'px',height:rectHeight + 'px',left:rectX+'px',top:rectY+'px'}"
        v-show="rectShow"
        class="select-box-dashed">
      </div>
      <div id="toolbar">
        Number of selected elements: <span>{{selectedItemNum}}</span>
      </div>
    </div>
  </Story>
</template>

<style>
  #components-container {
    height: 100vh;
  }

  .select-box-dashed{
    position: absolute;
    width: 0px;
    height: 0px;
    padding: 0px;
    margin: 0px;
    border: 1px dashed #0099ff;
    z-index:9999;
    background-color: #c3d5ed;
    opacity: 0.5;
    filter: alpha(opacity=50);
    font-size: 0px;
  }
</style>

<docs lang="md">
  ## Select and drag Multiple Elements

  This is not a feature provided by the component by default, but it's an example of how you can build complex scenarios using existing features.

  Make a selection with the mouse to include one or more elements so you can drag them together.
</docs>
