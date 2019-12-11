import { connect } from 'react-redux'
import Immutable from 'immutable'
import SubHeader from './SubHeader'

const SubHeaderContainer = connect((state, ownProps) => {
  const isAuthenticated = state.auth.get('isAuthenticated')
  let orderRecipesNo = 0

  if (ownProps.orderId) {
    orderRecipesNo = state.basket.get('recipes', Immutable.List([])).size
  }

  return {
    orderRecipesNo,
    isAuthenticated,
    fromJoin: state.persist.get('simpleHeader', false),
  }
}, {
})(SubHeader)

export default SubHeaderContainer
