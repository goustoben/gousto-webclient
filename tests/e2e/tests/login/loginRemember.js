module.exports = {
	'Successfully remember me on login': function (browser) {
		const menu = browser.page.menu()
		const shared = browser.page.shared()
		const home = browser.page.home()

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
				home.navigate()
				shared.section.body.isRememberMeCheckboxVisible()
				shared.section.body.login(user.customer.email, user.customer.password)
				shared.section.header.checkUserLoggedIn()
				done()
			})
			browser
			.perform(function(browser, done) {
				home.navigate()
				shared.section.header.checkUserLoggedIn()
				shared.section.body.logout()
				shared.section.body.isRememberMeCheckboxVisible()
				done()
			})
			.end()
	},
	tags: ['login', 'login-remember'],
};
