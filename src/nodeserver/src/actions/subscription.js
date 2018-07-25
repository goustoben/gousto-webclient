/* eslint no-use-before-define: ["error", { "functions": false }] */
import actionTypes from './actionTypes'
import subscriptionApi from 'apis/subscription'

const subActions = {
	subscriptionLoadData,
}

function subscriptionLoadData() {
	return async (dispatch, getState) => {
		const accessToken = getState().auth.get('accessToken')
		const { data = {} } = await subscriptionApi.fetchSubscription(accessToken)
		dispatch({
			type: actionTypes.SUBSCRIPTION_LOAD_DATA,
			data,
		})
	}
}

export default subActions
