import { connect } from 'react-redux'
import {
  trackDeliveryOther,
  trackDeliveryStatus,
} from 'actions/getHelp'
import { Delivery } from './Delivery'

const DeliveryContainer = connect(null, {
  trackDeliveryOther,
  trackDeliveryStatus,
})(Delivery)

export {
  DeliveryContainer
}
