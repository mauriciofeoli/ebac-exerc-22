const cart = require('../app-actions/cart.actions')

describe('Fluxo de checkout', () => {
  it('deve adicionar produto ao carrinho e seguir para o checkout', () => {
    cart.visitHome()
    cart.openFirstProductOptions()
    
    cy.wait(1000)
    
    cart.selectSize('L')
    cart.selectColor('Orange')
    cart.addToCart()
    
    cy.wait(2000)

    cy.contains('Ver carrinho', { timeout: 10000 }).should('be.visible').click()
    cy.url().should('include', '/carrinho')
    cy.contains('a', 'Checkout').click({ force: true })
    cy.url().should('include', '/checkout')
    cy.get('body').should('not.contain', 'Seu carrinho está vazio')
  })
})
