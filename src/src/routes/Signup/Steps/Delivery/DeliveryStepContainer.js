import { connect } from 'react-redux'
import DeliveryStep from './DeliveryStep'
import actions from 'actions'
import actionTypes from 'actions/actionTypes'
import { getLandingDay } from 'utils/deliveries'

function mapStateToProps(state) {
	const landing = getLandingDay(
			state,
			true,
			true,
		)

	const tempDate = state.temp.get('date', landing.date)
	const tempSlotId = state.temp.get('slotId', landing.slotId)

	return {
		boxSummaryDeliveryDays: state.boxSummaryDeliveryDays,
		tempDate,
		tempSlotId,
		menuFetchDataPending: state.pending.get(actionTypes.MENU_FETCH_DATA, false),
	}
}

const DeliveryStepContainer = connect(mapStateToProps, {
	setTempDate: date => actions.temp('date', date),
	setTempSlotId: slotId => actions.temp('slotId', slotId),
	boxSummaryDeliverySlotChosen: actions.boxSummaryDeliverySlotChosen,
})(DeliveryStep)

export default DeliveryStepContainer
