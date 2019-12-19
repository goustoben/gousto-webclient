import { connect } from 'react-redux'
import CheckoutLayout from './CheckoutLayout'

export default connect((state, ownProps) => ({
  params: ownProps.params,
}), {})(CheckoutLayout)
