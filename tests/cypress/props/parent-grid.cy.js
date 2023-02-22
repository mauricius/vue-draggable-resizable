import { createApp } from 'vue/dist/vue.esm-bundler'
import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'
import translateToMatrix from '../utils'

describe('`parent` and `grid` props', () => {

  it('should not drag the component outside the parent node when grid is an exact dividend of the parent size', () => {
    const ParentComponent = {
      template: `<div class="parent" style="width: 400px; height: 400px;">
        <vue-draggable-resizable :x="0" :y="0" :w="300" :h="300" :parent="true" :active="true" :grid=[20,20]></vue-draggable-resizable>
      </div>`,
      components: {
        VueDraggableResizable
      }
    }

    cy.mount(ParentComponent)

    cy.get('div.vdr')
      .move({ deltaX: 120, deltaY: 120 })
      .should('have.css', 'transform', translateToMatrix(100, 100))
  })

  it('should not resize the component outside the parent node when the grid is an exact dividend of the parent size', () => {
    const ParentComponent = {
      template: `<div class="parent" style="width: 400px; height: 400px;">
        <vue-draggable-resizable :x="0" :y="0" :w="300" :h="300" :parent="true" :active="true" :grid=[20,20]></vue-draggable-resizable>
      </div>`,
      components: {
        VueDraggableResizable
      }
    }

    cy.mount(ParentComponent)

    cy.get('div.handle-br')
      .move({ deltaX: 120, deltaY: 120 })

    cy.get('div.vdr')
      .should('have.css', 'transform', translateToMatrix(0, 0))
      .should('have.css', 'width', '400px')
      .should('have.css', 'height', '400px')
  })

  it('should not drag the component outside the parent node when grid is not an exact dividend of the parent size', () => {
    const ParentComponent = {
      template: `<div class="parent" style="width: 400px; height: 400px;">
        <vue-draggable-resizable :parent="true" :grid=[24,24] :x="0" :y="0" :w="360" :h="360" :active="true"></vue-draggable-resizable>
      </div>`,
      components: {
        VueDraggableResizable
      }
    }

    cy.mount(ParentComponent)

    cy.get('div.vdr')
      .move({ deltaX: 48, pageY: 48 })
      .should('have.css', 'transform', translateToMatrix(24, 24))
  })

  it('should not resize the component outside the parent node when the grid is not an exact dividend of the parent size', () => {
    const ParentComponent = {
      template: `<div class="parent" style="width: 400px; height: 400px;">
        <vue-draggable-resizable :parent="true" :grid=[24,24] :x="0" :y="0" :w="360" :h="360" :active="true"></vue-draggable-resizable>
      </div>`,
      components: {
        VueDraggableResizable
      }
    }

    cy.mount(ParentComponent)

    cy.get('div.handle-br')
      .move({ deltaX: 50, deltaY: 50 })

    cy.get('div.vdr')
      .should('have.css', 'width', '384px')
      .should('have.css', 'height', '384px')
  })

  it('should not drag the component outside the parent node when component has offset and grid is not an exact dividend of the parent size', () => {
    const ParentComponent = {
      template: `<div class="parent" style="width: 400px; height: 400px;">
        <vue-draggable-resizable :parent="true" :grid=[24,24] :x="10" :y="10" :w="360" :h="360" :active="true"></vue-draggable-resizable>
      </div>`,
      components: {
        VueDraggableResizable
      }
    }

    cy.mount(ParentComponent)

    cy.get('div.vdr')
      .move({ deltaX: 48, deltaY: 48 })
      .should('have.css', 'transform', translateToMatrix(34, 34))
  })

  it('should not resize the component outside the parent node when component has offset the grid is not an exact dividend of the parent size', () => {
    const ParentComponent = {
      template: `<div class="parent" style="width: 400px; height: 400px;">
        <vue-draggable-resizable :parent="true" :grid=[24,24] :x="10" :y="10" :w="360" :h="360" :active="true"></vue-draggable-resizable>
      </div>`,
      components: {
        VueDraggableResizable
      }
    }

    cy.mount(ParentComponent)

    cy.get('div.handle-br')
      .move({ deltaX: 50, deltaY: 50 })

    cy.get('div.vdr')
      .should('have.css', 'width', '384px')
      .should('have.css', 'height', '384px')
  })
})
