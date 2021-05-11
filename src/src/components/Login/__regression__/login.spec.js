import { withPlatformTags, MOBILE, WEB } from '../../../utils/regression/tags'

describe('User log in flow', () => {
  beforeEach(() => {
    cy.stubAll3rdParties()
    cy.stubAllApis()
    cy.intercept('POST', /identify/, { fixture: 'auth/identify' }).as('identifyRequest')
  })

  withPlatformTags(WEB).describe('on web', () => {
    describe('when login credentials succeed', () => {
      beforeEach(() => {
        cy.intercept('POST', /login/, { fixture: 'auth/login' })
      })

      it('should allow a user to enter credentials and then sucessfully log in', () => {
        cy.visit('/menu')
        cy.get('[data-testing="loginButton"]').click()

        cy.get('form').within(() => {
          cy.get('[data-testing="inputLoginEmail"]').type('email@gmail.com')
          cy.get('[data-testing="inputLoginPassword"]').type('password')
          cy.get('[data-testing="loginFormSubmit"]').click()
        })

        cy.wait('@identifyRequest')
        cy.get('[data-testing="logoutButton"]').should('be.visible')
      })
    })

    describe('when login credentials fail', () => {
      beforeEach(() => {
        cy.intercept('POST', /login/, { fixture: 'auth/loginInvalid' })
      })

      it('show display an error message', () => {
        cy.visit('/menu')
        cy.get('[data-testing="loginButton"]').click()

        cy.get('form').within(() => {
          cy.get('[data-testing="inputLoginEmail"]').type('email@gmail.com')
          cy.get('[data-testing="inputLoginPassword"]').type('password')
          cy.get('[data-testing="loginFormSubmit"]').click()
        })

        cy.get('[data-testing="loginErrMsg"]').should('be.visible')
      })
    })
  })

  withPlatformTags(MOBILE).describe('on mobile', () => {
    it('should allow a user to enter credentials and then sucessfully log in', () => {
      cy.visit('/menu')
      cy.get('button[data-testing="burgerMenu"]').click()
      cy.get('li[data-testing="burgerMenuLogin"]').click()

      cy.contains('Forgot your password?').should('be.visible')

      cy.get('form').within(() => {
        cy.get('[data-testing="inputLoginEmail"]').type('email@gmail.com')
        cy.get('[data-testing="inputLoginPassword"]').type('password')
        cy.get('[data-testing="loginFormSubmit"]').click()
      })

      cy.wait('@identifyRequest')
      cy.get('[data-testing="linkMenuAccount"]').should('be.visible')
    })

    describe('when login credentials fail', () => {
      beforeEach(() => {
        cy.intercept('POST', /login/, { fixture: 'auth/loginInvalid' })
      })

      it('show display an error message', () => {
        cy.visit('/menu')
        cy.get('button[data-testing="burgerMenu"]').click()
        cy.get('li[data-testing="burgerMenuLogin"]').click()

        cy.contains('Forgot your password?').should('be.visible')

        cy.get('form').within(() => {
          cy.get('[data-testing="inputLoginEmail"]').type('email@gmail.com')
          cy.get('[data-testing="inputLoginPassword"]').type('password')
          cy.get('[data-testing="loginFormSubmit"]').click()
        })

        cy.get('[data-testing="loginErrMsg"]').should('be.visible')
        // })
      })
    })
  })
})
