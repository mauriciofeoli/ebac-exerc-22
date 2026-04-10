module.exports = {
  visitHome() {
    cy.visit('/')
  },

  openFirstProductOptions() {
    cy.get('a.add_to_cart_button').first().click({ force: true })
  },

  selectSize(size) {
    cy.get('select[name="attribute_size"]').select(size, { force: true })
  },

  selectColor(color) {
    cy.get('select[name="attribute_color"]').select(color, { force: true })
  },

  addToCart() {
    cy.get('button.single_add_to_cart_button').click({ force: true })
  },
}
