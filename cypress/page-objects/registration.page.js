module.exports = {
  visit() {
    cy.visit('/my-account/')
  },

  fillEmail(email) {
    cy.get('#reg_email').type(email)
  },

  fillPassword(password) {
    cy.get('#reg_password').type(password)
  },

  submit() {
    cy.get('input[name="register"]').click()
  },

  assertSuccess() {
    cy.get('#reg_email').should('not.exist')
    cy.contains('Logout').should('exist')
  },
}
