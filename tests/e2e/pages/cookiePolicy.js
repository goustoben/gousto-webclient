const clickElement = require('../commands/clickElement');

module.exports = {
	url: function () {
		return this.api.launchUrl + '/'
	},

	sections: {
		cookiePolicyBanner: {
			selector: '*[data-testing="cookiePolicyBanner"]',

			elements: {
				CTA: {
					selector: '*[data-testing="cookiePolicyBannerBtn"]',
				},
			},

			commands: [{
				checkIfCookieBannerVisible: function () {
					this.waitForElementVisible('@CTA', 2000)
				},
				checkIfCookieBannerNotPresent: function () {
					this.waitForElementNotPresent('@CTA', 2000)
				},
				clickCookiePolicyBannerBtn: function () { clickElement.call(this, '@CTA') }
			}]
		}
	}
}
