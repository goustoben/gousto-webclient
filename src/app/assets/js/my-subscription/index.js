import Gousto from '@fe/gousto-generic'
import CONFIG from '@fe/gousto-config'

const $ = window.$

const toggleSubscriptionPage = () => {
	window.scrollTo(0, 0)
	$('.heading-text').slideToggle()
	$('#account-subscription-inactive').slideToggle()
	$('#account-subscription-details').toggleClass('is-disabled')
	$('#account-subscription-summary').slideToggle()
	$('#account-subscription-pause').slideToggle()
}

window.toggleSubscriptionPage = toggleSubscriptionPage

Gousto.globalAjaxSetup(CONFIG, window.pageData ? window.pageData : null)

$('#subscription-hold-submit').on('click', () => {
	if (window.showNewRecoveryFlow) {
		window.showNewRecoveryFlow()
	}
})
