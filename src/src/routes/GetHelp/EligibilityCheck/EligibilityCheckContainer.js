import { connect } from 'react-redux'
import { getIsAuthenticated } from 'selectors/auth'
import { getUserOrdersForGetHelp } from 'selectors/getHelp'
import { getUserId } from 'selectors/user'
import { getUserOrders, loadOrderAndRecipesByIds, storeGetHelpOrder } from '../actions/getHelp'
import { EligibilityCheck } from './EligibilityCheck'

const mapStateToProps = (state) => ({
  isAuthenticated: getIsAuthenticated(state),
  orders: getUserOrdersForGetHelp(state),
  userId: getUserId(state),
})

const EligibilityCheckContainer = connect(mapStateToProps, {
  getUserOrders,
  loadOrderAndRecipesByIds,
  storeGetHelpOrder,
})(EligibilityCheck)

export {
  EligibilityCheckContainer
}
