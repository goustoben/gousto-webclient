module.exports = {
	'Fail login from /menu': function (browser) {
		const menu = browser.page.menu()
		const shared = browser.page.shared()
		const body = shared.section.body
		let user

		browser
			.perform(function(done) {
				body.createUser().then(function (userData) {
					user = userData
					done()
				}).catch(function(error) {
					browser.assert.fail(error)
					done()
				})
			})
			.perform(function(browser, done) {
				menu.navigate()
				body.login('invalidemail.com', user.password)
				body.checkLoginErrMsg('The email address you\'ve entered is formatted incorrectly.')

				shared.section.header.checkUserLoggedOut()
				done()
			})
			.perform(function(browser, done) {
				menu.navigate()
				body.login('', user.password)
				body.checkLoginErrMsg('Please enter an email address.')

				shared.section.header.checkUserLoggedOut()
				done()
			})
			.perform(function(browser, done) {
				menu.navigate()
				body.login(user.email, '')
				body.checkLoginErrMsg('Please enter a password.')

				shared.section.header.checkUserLoggedOut()
				done()
			})
			.end()
	},
	tags: ['login', 'fail-login'],
};
