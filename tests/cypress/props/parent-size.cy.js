import { createApp } from 'vue/dist/vue.esm-bundler'
import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'
import translateToMatrix from '../utils'

const ParentComponent = {
  props: {
    w: {
      type: Number
    },
    h: {
      type: Number
    },
  },
  components: {
    VueDraggableResizable
  }
}

describe('`parent` and `size` props', () => {

  it('should set the component size outside the parent node if `parent` prop is false', () => {
    ParentComponent.template = `<div class="parent" style="width: 200px; height: 200px;">
      <vue-draggable-resizable :x="0" :y="0" :w="w" :h="h" :parent="false" :active="true"></vue-draggable-resizable>
    </div>`

    cy.mount(ParentComponent, {
      props: {
        w: 200,
        h: 200
      }
    })

    cy.get('@vue')
      .then(wrapper => {
        wrapper.setProps({ w: 300, h: 300 })
      })

    cy.get('div.vdr')
      .should('have.css', 'transform', translateToMatrix(0, 0))
      .should('have.css', 'width', '300px')
      .should('have.css', 'height', '300px')
  })

  it('should not set the component size outside the parent node if `parent` prop is true', () => {
    ParentComponent.template = `<div class="parent" style="width: 200px; height: 200px;">
      <vue-draggable-resizable :x="0" :y="0" :w="w" :h="h" :parent="true" :active="true"></vue-draggable-resizable>
    </div>`

    cy.mount(ParentComponent, {
      props: {
        w: 200,
        h: 200
      }
    })

    cy.get('@vue')
      .then(wrapper => {
        wrapper.setProps({ w: 300, h: 300 })
      })

    cy.get('div.vdr')
      .should('have.css', 'transform', translateToMatrix(0, 0))
      .should('have.css', 'width', '200px')
      .should('have.css', 'height', '200px')
  })
})
