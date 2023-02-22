import { createApp } from 'vue/dist/vue.esm-bundler'
import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'
import translateToMatrix from '../utils'

const ParentComponent = {
  props: {
    x: {
      type: Number
    },
    y: {
      type: Number
    },
  },
  components: {
    VueDraggableResizable
  }
}

describe('`parent` and `position` props', () => {

  it('should set the component position outside the parent node if `parent` prop is false', () => {
    ParentComponent.template = `<div class="parent" style="width: 200px; height: 200px;">
      <vue-draggable-resizable ref="vdr" :x="x" :y="y" :w="200" :h="200" :parent="false" :active="true"></vue-draggable-resizable>
    </div>`

    cy.mount(ParentComponent, {
      props: {
        x: 0,
        y: 0
      }
    })

    cy.get('@vue')
      .then(wrapper => {
        wrapper.setProps({ x: 100, y: 100 })
      })

    cy.get('div.vdr')
      .should('have.css', 'transform', translateToMatrix(100, 100))
  })

  it('should not set the component position outside the parent node if `parent` prop is true', () => {
    ParentComponent.template = `<div class="parent" style="width: 200px; height: 200px;">
      <vue-draggable-resizable ref="vdr" :x="x" :y="y" :w="200" :h="200" :parent="true" :active="true"></vue-draggable-resizable>
    </div>`

    cy.mount(ParentComponent, {
      props: {
        x: 0,
        y: 0
      }
    })

    cy.get('@vue')
      .then(wrapper => {
        wrapper.setProps({ x: 100, y: 100 })
      })

    cy.get('div.vdr')
      .should('have.css', 'transform', translateToMatrix(0, 0))
  })
})
