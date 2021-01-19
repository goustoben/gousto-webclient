import { withPlatformTags, MOBILE, WEB } from '../../../utils/regression/tags'
import { cyGetIsRecaptchaEnabled } from '../../../routes/Checkout/__regression__/pageUtils/checkout/checkoutPayment'

describe('User log in flow', () => {
  beforeEach(() => {
    cy.server()

    cy.fixture('auth/login').as('login')
    cy.fixture('auth/loginInvalid').as('loginInvalid')
    cy.route('POST', /login/, '@login')
    cy.fixture('auth/identify').as('identify')
    cy.route('POST', /identify/, '@identify').as('identifyRequest')
  })

  withPlatformTags(WEB).describe('on web', () => {
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

    describe('when login credentials fail', () => {
      beforeEach(() => {
        cy.route('POST', /login/, '@loginInvalid')
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

      // when the login page is opened we send the `CHANGE_RECAPTCHA` which
      // will is the variable we fetch using `cyGetIsRecaptchaEnabled`.
      // So we wait for the login page to render, which would have
      // sent this event and processed it
      cy.contains('Forgot your password?').should('be.visible')
      cy.wait(250)

      cy.window().then(cyGetIsRecaptchaEnabled).then(isRecaptchaEnabled => {
      // Wait until recaptcha is loaded because submitting the form
      // relies on recaptcha.execute().  In normal operation, recaptcha
      // (a third-party script) loads faster than the user is able to
      // press the Submit button; but this test presses more quickly, so
      // the wait is needed.
        cy.log(`isRecaptchaEnabled: ${isRecaptchaEnabled}`)

        if (isRecaptchaEnabled) cy.get('.grecaptcha-badge')

        cy.get('form').within(() => {
          cy.get('[data-testing="inputLoginEmail"]').type('email@gmail.com')
          cy.get('[data-testing="inputLoginPassword"]').type('password')
          cy.get('[data-testing="loginFormSubmit"]').click()
        })

        cy.wait('@identifyRequest')
        cy.get('[data-testing="linkMenuAccount"]').should('be.visible')
      })
    })

    describe('when login credentials fail', () => {
      beforeEach(() => {
        cy.route('POST', /login/, '@loginInvalid')
      })

      it('show display an error message', () => {
        cy.visit('/menu')
        cy.get('button[data-testing="burgerMenu"]').click()
        cy.get('li[data-testing="burgerMenuLogin"]').click()

        // when the login page is opened we send the `CHANGE_RECAPTCHA` which
        // will is the variable we fetch using `cyGetIsRecaptchaEnabled`.
        // So we wait for the login page to render, which would have
        // sent this event and processed it
        cy.contains('Forgot your password?').should('be.visible')
        cy.wait(250)

        cy.window().then(cyGetIsRecaptchaEnabled).then(isRecaptchaEnabled => {
        // Wait until recaptcha is loaded because submitting the form
        // relies on recaptcha.execute().  In normal operation, recaptcha
        // (a third-party script) loads faster than the user is able to
        // press the Submit button; but this test presses more quickly, so
        // the wait is needed.
          cy.log(`isRecaptchaEnabled: ${isRecaptchaEnabled}`)

          if (isRecaptchaEnabled) cy.get('.grecaptcha-badge')

          cy.get('form').within(() => {
            cy.get('[data-testing="inputLoginEmail"]').type('email@gmail.com')
            cy.get('[data-testing="inputLoginPassword"]').type('password')
            cy.get('[data-testing="loginFormSubmit"]').click()
          })

          cy.get('[data-testing="loginErrMsg"]').should('be.visible')
        })
      })
    })
  })
})
