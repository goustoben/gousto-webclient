
import { loginFormBot } from '../bots/login-form.bot';
describe('A user attempts to login from the menu', () => {
  const { loginFormBot, menuBot } = cy.bots

  beforeEach(() => {
    // arrange
    menuBot.visitMenu()
  })

  describe('and they have valid credentials', () => {
    beforeEach(() => {
      // arrange
      loginFormBot.prepareForAuthSuccess()

      // act
      menuBot.clickShowLoginButton()
      loginFormBot.attemptLogin()
    })

    it('then they should be logged in and see recipes in the menu', () => {
      // assert
      loginFormBot.assertLogoutButtonIsVisible()
      menuBot.assertMenuIsVisible()
      menuBot.assertNumberOfRecipeImagesVisible(2)
    })
  })
})
