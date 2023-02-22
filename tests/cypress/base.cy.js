import VueDraggableResizable from '@/components/vue-draggable-resizable.vue'

describe('VueDraggableResizable base tests', () => {

  it('should render correctly', () => {
    cy.mount(VueDraggableResizable)

    cy.get('div')
      .should('be.visible')
      .and('have.class', 'vdr')
  })

  it('should render the elements in default slot', () => {
    cy.mount(VueDraggableResizable, {
      slots: {
        default: '<p>Resize Me</p>'
      }
    })

    cy.get('div.vdr')
      .find('p')
      .should('be.visible')
      .and('have.text', 'Resize Me')
  })

  it('should render the component with 8 handles by default', () => {
    cy.mount(VueDraggableResizable)

    cy.get('div.handle')
      .should('not.be.empty')
      .and('have.length', 8)
      .and($handles => {
        const classes = $handles.map((i, el) => {
          return Cypress.$(el).attr('class')
        })

        expect(classes.get()).to.deep.eq([
          'handle handle-tl',
          'handle handle-tm',
          'handle handle-tr',
          'handle handle-mr',
          'handle handle-br',
          'handle handle-bm',
          'handle handle-bl',
          'handle handle-ml',
        ])
      })
  })

  it('should provide named slots for each one of the handles', () => {
    cy.mount(VueDraggableResizable, {
      slots: {
        tl: '<span>TL</span>',
        tm: '<span>TM</span>',
        tr: '<span>TR</span>',
        mr: '<span>MR</span>',
        br: '<span>BR</span>',
        bm: '<span>BM</span>',
        bl: '<span>BL</span>',
        ml: '<span>ML</span>'
      }
    })

    cy.get('div.handle-tl').should('have.html', '<span>TL</span>')
    cy.get('div.handle-tm').should('have.html', '<span>TM</span>')
    cy.get('div.handle-tr').should('have.html', '<span>TR</span>')
    cy.get('div.handle-mr').should('have.html', '<span>MR</span>')
    cy.get('div.handle-br').should('have.html', '<span>BR</span>')
    cy.get('div.handle-bm').should('have.html', '<span>BM</span>')
    cy.get('div.handle-bl').should('have.html', '<span>BL</span>')
    cy.get('div.handle-ml').should('have.html', '<span>ML</span>')
  })

  it('should not block event bubbling', () => {
    const onActivated = cy.spy().as('onActivatedSpy')

    cy.mount(VueDraggableResizable, {
      propsData: {
        onActivated
      },
      slots: {
        default: '<input type="text" class="input" />'
      }
    })

    cy.get('input').click()

    cy.get('@onActivatedSpy')
      .should('have.been.called')

    cy.get('div.vdr').should('have.class', 'active')
  })
})
