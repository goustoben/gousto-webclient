import { connect } from 'react-redux'
import { change, getFormValues, untouch } from 'redux-form'
import DeliveryDetails from './DeliveryDetails'

function mapStateToProps(state, ownProps) {
  const formValues = getFormValues(ownProps.formName)(state)

  return {
    deliveryAddress: formValues && formValues[ownProps.sectionName] ? formValues[ownProps.sectionName] : {},
  }
}

const DeliveryDetailsContainer = connect(mapStateToProps, {
  change,
  untouch,
})(DeliveryDetails)

export default DeliveryDetailsContainer
