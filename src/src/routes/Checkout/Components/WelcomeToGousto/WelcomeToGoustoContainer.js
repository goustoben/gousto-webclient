import { connect } from 'react-redux'
import { trackWelcomeToGoustoButton } from 'actions/checkout'
import { getUserOrderDetailsById } from 'selectors/user'
import { WelcomeToGousto } from './WelcomeToGousto'

export function mapStateToProps(state, ownProps) {
  const { orderId } = ownProps.params
  const order = getUserOrderDetailsById(state, { orderId })

  return {
    orderId,
    deliveryDate: order.get('deliveryDate'),
    whenCutoff: order.get('whenCutoff'),
  }
}

const WelcomeToGoustoContainer = connect(mapStateToProps, { trackWelcomeToGoustoButton })(
  WelcomeToGousto
)

export { WelcomeToGoustoContainer }
