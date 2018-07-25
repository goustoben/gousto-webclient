export default (action, state = {}) => {
	if (__CLIENT__ && window.dataLayer) {
		if (action.asource === 'awin') {
			const event = {
				eventType: 'affiliateEvent',
				...action,
				state,
			}

			window.dataLayer.push(event)
		}
	}
}
