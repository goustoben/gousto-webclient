import { GoustoApi } from '../fixtures/api'
import { GoustoTestBot } from './gousto-test.bot';

const loginSelectors = {
  dataTesting: {
    BUTTON_LOGIN: 'loginButton',
    BUTTON_LOGOUT: 'logoutButton',
    INPUT_EMAIL: 'inputLoginEmail',
    INPUT_SUBMIT: 'inputLoginPassword',
    SUBMIT: 'loginFormSubmit',
  },
  form: 'form',
}

class LoginFormBot extends GoustoTestBot {
  static DEFAULT_EMAIL = 'test.user@gousto.co.uk'

  static DEFAULT_PASSWORD = 'testPassword!123'

  getForm(){ return cy.get(this.selectors.form) }

  getEmailInput(){ return this.getByDataTestingName('INPUT_EMAIL') }

  getPasswordInput(){ return this.getByDataTestingName('INPUT_SUBMIT') }

  getSubmitButton(){ return this.getByDataTestingName('SUBMIT') }

  getLogoutButton(){ return this.getByDataTestingName('BUTTON_LOGOUT') }

  prepareForAuthSuccess() {
    cy.intercept(/authIdentify/, GoustoApi.identify.success.testUser)
    cy.intercept(/login/, GoustoApi.login.success.testUser)
  }

  enterLoginCredentials(email = LoginFormBot.DEFAULT_EMAIL, password = LoginFormBot.DEFAULT_PASSWORD) {
    this.getForm().within(() => {
      this.getEmailInput().type(email)
      this.getPasswordInput().type(password)
    })
  }

  submitLoginForm(){ return this.getSubmitButton().click() }

  attemptLogin(email = LoginFormBot.DEFAULT_EMAIL, password = LoginFormBot.DEFAULT_PASSWORD) {
    this.enterLoginCredentials(email, password)

    return this.submitLoginForm()
  }

  assertLogoutButtonIsVisible() {
    this.getLogoutButton().should('be.visible')
  }
}

export const loginFormBot = new LoginFormBot(loginSelectors)
