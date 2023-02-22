import { createApp } from 'vue/dist/vue.esm-bundler'
import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'
import translateToMatrix from '../utils'

const ParentComponent = {
  components: {
    VueDraggableResizable
  }
}

describe('`parent` prop', () => {

  it('should drag the component outside the parent node if `parent` prop is false', () => {
    ParentComponent.template = `<div class="parent" style="width: 200px; height: 200px;">
      <vue-draggable-resizable :x="0" :y="0" :w="200" :h="200" :parent="false" :active="true"></vue-draggable-resizable>
    </div>`

    cy.mount(ParentComponent)

    cy.get('div.vdr')
      .move({ deltaX: 50, deltaY: 50 })

    cy.get('div.vdr')
      .should('have.css', 'transform', translateToMatrix(50, 50))
  })

  it('should not drag the component outside the parent node if `parent` prop is true', () => {
    ParentComponent.template = `<div class="parent" style="width: 200px; height: 200px;">
      <vue-draggable-resizable :x="0" :y="0" :w="200" :h="200" :parent="true" :active="true"></vue-draggable-resizable>
    </div>`

    cy.mount(ParentComponent)

    cy.get('div.vdr')
      .move({ deltaX: 50, deltaY: 50 })

    cy.get('div.vdr')
      .should('have.css', 'transform', translateToMatrix(0, 0))
  })

  it('should resize the component outside the parent node if `parent` prop is false', () => {
    ParentComponent.template = `<div class="parent" style="width: 200px; height: 200px;">
      <vue-draggable-resizable :w="200" :h="200" :parent="false" :active="true"></vue-draggable-resizable>
    </div>`

    cy.mount(ParentComponent)

    cy.get('div.handle-br')
      .move({ deltaX: 50, deltaY: 50 })

    cy.get('div.vdr')
      .should('have.css', 'transform', translateToMatrix(0, 0))
      .should('have.css', 'width', '250px')
      .should('have.css', 'height', '250px')
  })

  it('should not resize the component outside the parent node if `parent` prop is true', () => {
    ParentComponent.template = `<div class="parent" style="width: 200px; height: 200px;">
      <vue-draggable-resizable :w="200" :h="200" :parent="true" :active="true"></vue-draggable-resizable>
    </div>`

    cy.mount(ParentComponent)

    cy.get('div.handle-br')
      .move({ deltaX: 50, deltaY: 50 })

    cy.get('div.vdr')
      .should('have.css', 'transform', translateToMatrix(0, 0))
      .should('have.css', 'width', '200px')
      .should('have.css', 'height', '200px')
  })

  it('should resize correctly after the parent changes size to bigger values', () => {
    ParentComponent.template = `<div class="parent" style="width: 250px; height: 250px;">
      <vue-draggable-resizable :w="200" :h="200" :parent="true" :active="true"></vue-draggable-resizable>
    </div>`

    cy.mount(ParentComponent)

    cy.get('div.handle-br')
      .move({ deltaX: 50, deltaY: 50 })

    cy.get('@vue').then(wrapper => {
      const $parent = wrapper.vm.$el

      $parent.style.width = '300px'
      $parent.style.height = '300px'

      window.dispatchEvent(new Event('resize'))

      cy.get('div.handle-br')
        .move({ deltaX: 50, deltaY: 50 })

      cy.get('div.vdr')
        .should('have.css', 'transform', translateToMatrix(0, 0))
        .should('have.css', 'width', '300px')
        .should('have.css', 'height', '300px')
    })
  })
})
