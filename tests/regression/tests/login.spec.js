import { isMobile } from '../helper'

describe("User log in flow", () => {
  it('should allow a user to enter credentials and then sucessfully log in', () => {
    cy.server()

    cy.fixture('auth/login').as('login')
    cy.route('POST', /login/, '@login')
    cy.fixture('auth/identify').as('identify')
    cy.route('POST', /identify/, '@identify')

    cy.visit('/menu')
    if (isMobile()) {
      cy.get('button[data-testing="burgerMenu"]').click()
      cy.get('li[data-testing="burgerMenuLogin"]').click()
    } else {
      cy.contains('Login').click()
    }

    cy.get('form').within(($form) => {
      cy.get('input[name="email"]').type('email@gmail.com', {force: true})
      cy.get('input[name="password"]').type('password', {force: true})
      cy.get('[data-testing="loginFormSubmit"]').click()
    })
    if (isMobile()) {
      cy.get('[data-testing="linkMenuAccount"]').should('be.visible')
    } else {
      cy.get('[data-testing="logoutButton"]').should('be.visible')
    }
  })
})
