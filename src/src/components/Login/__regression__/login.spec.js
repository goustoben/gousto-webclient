import { withPlatformTags, MOBILE, WEB } from '../../../utils/regression/tags'

describe("User log in flow", () => {
  beforeEach(() => {
    cy.server()

    cy.fixture('auth/login').as('login')
    cy.route('POST', /login/, '@login')
    cy.fixture('auth/identify').as('identify')
    cy.route('POST', /identify/, '@identify').as('identifyRequest')
  })

  describe('on web', () => {
    withPlatformTags(WEB).it('should allow a user to enter credentials and then sucessfully log in', () => {
      cy.visit('/menu')
      cy.get('[data-testing="loginButton"]').click()

      cy.get('form').within(($form) => {
        cy.get('input[name="email"]').type('email@gmail.com', {force: true})
        cy.get('input[name="password"]').type('password', {force: true})
        cy.get('[data-testing="loginFormSubmit"]').click()
      })

      cy.wait('@identifyRequest')
      cy.get('[data-testing="logoutButton"]').should('be.visible')
    })
  })

  describe('on mobile', () => {
    withPlatformTags(MOBILE).it('should allow a user to enter credentials and then sucessfully log in', () => {
      cy.visit('/menu')
      cy.get('button[data-testing="burgerMenu"]').click()
      cy.get('li[data-testing="burgerMenuLogin"]').click()

      cy.get('form').within(($form) => {
        cy.get('input[name="email"]').type('email@gmail.com', {force: true})
        cy.get('input[name="password"]').type('password', {force: true})
        cy.get('[data-testing="loginFormSubmit"]').click()
      })

      cy.wait('@identifyRequest')
      cy.get('[data-testing="linkMenuAccount"]').should('be.visible')
    })
  })
})
