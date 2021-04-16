import { connect } from 'react-redux'
import Immutable from 'immutable'
import { getFormValues } from 'redux-form'
import { getDeliveryFormName } from 'selectors/checkout'

import { DeliveryInfo } from './DeliveryInfo'

const mapStateToProps = (state) => {
  const formName = getDeliveryFormName(state)
  const formValues = getFormValues(formName)(state)
  const chosenId = formValues.delivery ? formValues.delivery.interval_id : '1'

  let frequency = 'weekly'
  const intervals = state.checkout.get('intervals', Immutable.List())
  if (chosenId && intervals.size) {
    const interval = intervals.find((i) => i.get('id') === chosenId)

    frequency = interval.get('title', '').toLowerCase()
  }

  return {
    frequency,
  }
}

const DeliveryInfoContainer = connect(mapStateToProps)(DeliveryInfo)

export { DeliveryInfoContainer }
