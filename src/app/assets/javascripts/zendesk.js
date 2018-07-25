var zendesk = function (pathName) {
	var interval;

	var enabledPages = [
		'/my-gousto',
		'/my-deliveries',
		'/my-details',
		'/my-subscription',
		'/my-referrals',
		'/rate-my-recipes',
		'/help',
		'/cookbook'
	]

	var shouldDisplayChat = enabledPages.indexOf(pathName) > -1

	return {
		getZopim: function (callback) {
			var zendeskCallAttempts = 0
			var interval = null

			var findZopimInstance = function () {
				if (window.$zopim) {
					callback()
				}

				if (zendeskCallAttempts > 3 || window.$zopim) {
					clearInterval(interval)
				}

				zendeskCallAttempts++
			}

			interval = setInterval(findZopimInstance, 1000)
		},
		chatButton: function () {
			// https://support.zendesk.com/hc/en-us/articles/203661356
			if (shouldDisplayChat) {
				window.$zopim(function () {
					window.$zopim.livechat.button.show()
					window.$zopim.livechat.window.onHide(function () {
						window.$zopim.livechat.button.show()
					})
				})
			} else {
				window.$zopim(function () { window.$zopim.livechat.hideAll() })
			}
		}
	}
}
