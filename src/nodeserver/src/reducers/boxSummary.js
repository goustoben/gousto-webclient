import Immutable from 'immutable' /* eslint-disable new-cap */
import actionTypes from 'actions/actionTypes'

const boxSummary = {
	boxSummaryShow: (state = Immutable.fromJS({ show: false, view: '' }), action) => {
		switch (action.type) {
			case actionTypes.BOXSUMMARY_VISIBILITY_CHANGE:
				return Immutable.fromJS({ show: action.show, view: action.view })
			default:
				return state
		}
	},
	boxSummaryDeliveryDays: (state = Immutable.Map({}), action) => {
		switch (action.type) {
			case actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE:
				return Immutable.fromJS(action.days)
			default:
				return state
		}
	},
	boxSummaryDeliveryDaysErr: (state = null, action) => {
		switch (action.type) {
			case actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE_ERROR:
				return Immutable.fromJS(action.err)
			case actionTypes.BOXSUMMARY_DELIVERY_DAYS_RECEIVE:
				return null
			default:
				return state
		}
	},
}

export default boxSummary
