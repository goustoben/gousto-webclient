const { loggableError } = require('../../../utils/loggableError')

module.exports = {
  'Successfully remember me on login': function (browser) {
    const menu = browser.page.menu()
    const shared = browser.page.shared()

    let user

    browser
      .perform(function (done) {
        shared.section.body.createUser().then(function (userData) {
          user = userData
          done()
        }).catch(function (error) {
          browser.assert.fail(loggableError(error))
          done()
        })
      })
      .perform(function (browser, done) {
        menu.navigate()
        shared.section.body.submitPromo()
        shared.section.body.isRememberMeCheckboxVisible()
        shared.section.body.login(user.customer.email, user.customer.password)
        shared.section.header.checkUserLoggedIn()
        browser.assert.urlContains("/menu")
        done()
      })
    browser
      .perform(function (browser, done) {
        shared.section.header.goToAccount()
        shared.section.body.logout()
        browser.pause(3000)
        shared.section.header.checkUserLoggedOut()
        browser.assert.title('Recipe Boxes | Get Fresh Food & Recipes Delivered | Gousto')
        shared.section.body.isRememberMeCheckboxVisible()
        done()
      })
      .end()
  },
  tags: ['login', 'logout'],
};
