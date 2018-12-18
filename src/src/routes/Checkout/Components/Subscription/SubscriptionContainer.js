import { connect } from 'react-redux'
import { getFormValues } from 'redux-form'
import { getDeliveryFormName } from 'selectors/checkout'

import Subscription from './Subscription'

const mapStateToProps = (state) => {
  const formName = getDeliveryFormName(state)

  const formValues = getFormValues(formName)(state)

  return {
    chosenIntervalId: (formValues.delivery) ? formValues.delivery.interval_id : '1',
    features: state.features,
    options: state.checkout.get('intervals'),
  }
}

const SubscriptionContainer = connect(mapStateToProps)(Subscription)

export default SubscriptionContainer
