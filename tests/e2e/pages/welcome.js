module.exports = {
	sections: {
		welcomeContainer: {
			selector: '*[data-testing=welcomeContainer]',

			elements: {
				expectationsCarousel: {
					selector: '*[data-testing=expectationsCarousel]',
				}
			},

			commands: [{
				checkIfWelcomePageVisible: function () {
					this
						.waitForElementVisible('@expectationsCarousel', 30000)
				},
			}],
		},
	}
}
