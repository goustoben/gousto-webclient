describe("User log in", () => {
  beforeEach(() => {
    cy.server()

    cy.fixture('auth/login').as('login')
    cy.route('POST', /login/, '@login')
    cy.fixture('auth/identify').as('identify')
    cy.route('POST', /identify/, '@identify')
  })

  describe('log in form', () => {
    it('should allow the user to enter an email address and password and log in', () => {
      cy.visit('/menu')
      cy.contains('Login').click()
      cy.get('form').within(($form) => {
        cy.get('input[name="email"]').type('email@gmail.com', {force: true})
        cy.get('input[name="password"]').type('password', {force: true})
        cy.get('[data-testing="loginFormSubmit"]').click()
      })
      cy.get('[data-testing="logoutButton"]').should('have.text','Logout')
    })
  })
})
