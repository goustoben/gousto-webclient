import { connect } from 'react-redux'
import { getIsCheckoutOverhaulEnabled } from 'selectors/features'
import CheckoutLayout from './CheckoutLayout'

export default connect((state, ownProps) => ({
  params: ownProps.params,
  isCheckoutOverhaulEnabled: getIsCheckoutOverhaulEnabled(state),
}), {})(CheckoutLayout)
