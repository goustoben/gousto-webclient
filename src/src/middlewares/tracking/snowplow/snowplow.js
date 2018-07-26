
export default (action, state = {}) => {
	if (__CLIENT__ && window.dataScienceDataLayer) {
		const actionType = action.actionType
		const actionValue = {}
		Object.keys(action)
			.filter(key => key !== 'actionType')
			.forEach(key => {
				actionValue[key] = action[key]
			})
		const event = Object.assign({}, state, { event: 'userAction' }, { actionType }, { actionValue: JSON.stringify(actionValue) })
		window.dataScienceDataLayer.push(event)
	}
}
