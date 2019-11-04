module.exports = {
  'Successful login from /menu': function (browser) {
    const menu = browser.page.menu()
    const shared = browser.page.shared()

    let user

    browser
      .perform(function(done) {
        shared.section.body.createUser().then(function (userData) {
          user = userData
          done()
        }).catch(function(error) {
          browser.assert.fail(error)
          done()
        })
      })
      .perform(function(browser, done) {
        menu.navigate()
        shared.section.body.login(user.customer.email, user.customer.password)
        shared.section.header.checkUserLoggedIn()

        done()
      })
      .end()
  },
  tags: ['login', 'login-success'],
};
