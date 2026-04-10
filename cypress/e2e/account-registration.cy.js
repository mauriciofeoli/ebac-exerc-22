const registration = require('../page-objects/registration.page')

describe('Cadastro de conta', () => {
  it('deve criar conta com email e senha válidos', () => {
    const email = `teste-${Date.now()}@mailinator.com`
    const password = 'Teste1234!'

    registration.visit()
    registration.fillEmail(email)
    registration.fillPassword(password)
    registration.submit()
    registration.assertSuccess()
  })
})
