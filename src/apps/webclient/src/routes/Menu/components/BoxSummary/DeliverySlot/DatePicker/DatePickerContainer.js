import { connect } from 'react-redux'

import { setTempDeliveryOptions } from 'actions/deliveries'
import tempActions from 'actions/temp'

import { DatePicker } from './DatePicker'

const mapStateToProps = (state) => ({
  disableNewDatePicker: !state.auth.get('isAuthenticated'),
})

const mapDispatchToProps = {
  setTempSlotId: (slotId) => tempActions.temp('slotId', slotId),
  handleDateChange: setTempDeliveryOptions,
}

const DatePickerContainer = connect(mapStateToProps, mapDispatchToProps)(DatePicker)

export { DatePickerContainer }
