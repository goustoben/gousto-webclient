module.exports = {
	sections: {
		orderConfirmationContainer: {
			selector: '*[data-testing=orderConfirmationContainer]',

			elements: {
				header: {
					selector: '*[data-testing=orderConfirmationHeader]',
				}
			},

			commands: [{
				checkIfOrderConfirmationPageVisible: function (browser) {
					browser
						.assert.urlContains('order-confirmation');
				},
			}],
		},
	}
}
