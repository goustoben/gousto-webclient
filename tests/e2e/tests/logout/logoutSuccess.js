module.exports = {
	'Successful logout from /menu': function (browser) {
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
				browser.assert.urlContains("/menu")
				done()
			})
			browser
			.perform(function(browser, done) {
				browser.refresh()
				shared.section.body.logout()
				shared.section.header.checkUserLoggedOut()
				browser.assert.title('Food Boxes | Get Fresh Food & Ingredients Delivered | Gousto')
				done()
			})
			.end()
	},
	tags: ['logout', 'logout-success'],
};
