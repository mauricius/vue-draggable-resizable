import { createApp } from 'vue/dist/vue.esm-bundler'
import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'
import translateToMatrix from '../utils'

describe('`lock-aspect-ratio` prop', () => {

  it('should provide the `lock-aspect-ratio` as prop', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        lockAspectRatio: true
      }
    })

    cy.get('@vue').should(wrapper => {
      expect(wrapper.props().lockAspectRatio).to.be.true
    })
  })

  it('should resize the component accordingly to its aspect ratio if `lock-aspect-ratio` is true', () => {
    cy.mount(VueDraggableResizable, {
      propsData: {
        w: 200,
        h: 100,
        active: true,
        lockAspectRatio: true
      }
    })

    cy.get('div.handle-mr')
      .move({ deltaX: 100, deltaY: 0 })

    cy.get('div.vdr')
      .should('have.css', 'transform', translateToMatrix(0, 0))
      .should('have.css', 'width', '300px')
      .should('have.css', 'height', '150px')
  })

  it('should not resize the component outside the parent node if `parent` prop is true and `lock-aspect-ratio` is set', () => {
    const ParentComponent = {
      template: `<div class="parent" style="width: 500px; height: 500px;">
        <vue-draggable-resizable :w="300" :h="400" :parent="true" :active="true" :lock-aspect-ratio="true"></vue-draggable-resizable>
      </div>`,
      components: {
        VueDraggableResizable
      }
    }

    cy.mount(ParentComponent)

    cy.get('div.handle-br')
      .move({ deltaX: 100, deltaY: 0 })

    cy.get('div.vdr')
      .should('have.css', 'transform', translateToMatrix(0, 0))
      .should('have.css', 'width', '375px')
      .should('have.css', 'height', '500px')
  })
})
