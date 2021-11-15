import { connect } from 'react-redux'
import { DatePicker } from './DatePicker'
import { setTempDeliveryOptions } from "actions/deliveries/setTempDeliveryOptions"
import { temp } from "actions/temp/temp"

const mapStateToProps = (state) => ({
  disableNewDatePicker: !state.auth.get('isAuthenticated'),
})

const mapDispatchToProps = {
  setTempSlotId: slotId => temp('slotId', slotId),
  handleDateChange: setTempDeliveryOptions
}

const DatePickerContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DatePicker)

export { DatePickerContainer }
