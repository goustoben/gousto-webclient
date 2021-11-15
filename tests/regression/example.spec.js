import { isMobile } from '../helper'

describe("Examples", () => {
  it("should load the menu", () => {
    cy.visit("/menu")
    cy.get("h1")
      .should("have.text", "Choose Recipes")
  })

  it("should error when user provides incorrect login credentials, on mobile and desktop", () => {
    cy.visit("/")

    if (isMobile()) {
      cy.get('button[data-testing="burgerMenu"]').click()
      cy.get('li[data-testing="burgerMenuLogin"]').click()
    } else {
      cy.contains('Login').click()
    }

    cy.get('form').within(($form) => {
      cy.get('[data-testing="inputLoginEmail"]').eq(1).type('email@gmail.com', {force: true})
      cy.get('[data-testing="inputLoginPassword"]').type('password', {force: true})
      cy.contains('Go').click()
    })
    cy.get('[data-testing="loginErrMsg"]')
      .should('have.text', 'Incorrect email/password.')
  })

  it("should login through the ui", () => {
    cy.server()

    cy.fixture('auth/login').as('login')
    cy.route('POST', /login/, '@login')
    cy.fixture('auth/authIdentify').as('identify')
    cy.route('POST', /authIdentify/, '@authIdentify')

    cy.visit('/menu')

    if (isMobile()) {
      cy.get('button[data-testing="burgerMenu"]').click()
      cy.get('li[data-testing="burgerMenuLogin"]').click()
    } else {
      cy.contains('Login').click()
    }

    cy.get('form').within(($form) => {
      cy.get('[data-testing="inputLoginEmail"]').type('email@gmail.com', {force: true})
      cy.get('[data-testing="inputLoginPassword"]').type('password', {force: true})
      cy.contains('Go').click()
    })

    cy.get('[data-testing="logoutButton"]').should('have.text','Logout')
  })


  it("should login with cookies", () => {
    cy.login()
    cy.visit('/menu')
    if (isMobile()) {
      cy.get('[data-testing="linkMenuAccount"]').should('have.text','Account')
    } else {
      cy.get('[data-testing="logoutButton"]').should('have.text','Logout')
    }
  })

  it("shows box prices with mocked backend api", () => {
    cy.server()
    cy.fixture('boxPrices').as('boxPrices')
    cy.visit("/box-prices")
    cy.get("span")
      .should((spans) => {
        expect(spans).to.contain('£12329.11')
      })
  })
})
