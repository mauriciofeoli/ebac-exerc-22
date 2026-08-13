const cart = require('../app-actions/cart.actions')

describe('Fluxo de checkout', () => {
  it('deve adicionar produto ao carrinho e seguir para o checkout', () => {
    cart.visitHome()
    cart.openFirstProductOptions()

    cy.contains('Product added', { timeout: 10000 }).should('be.visible')
    cy.contains('button, a', 'View cart', { matchCase: false }).click({ force: true })

    cy.url().should('include', '/carrinho')
    cy.contains('button, a', 'Checkout', { matchCase: false }).click({ force: true })
    cy.url().should('include', '/checkout')
    cy.get('body').should('not.contain', 'Seu carrinho está vazio')
  })
})
