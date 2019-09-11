import { connect } from 'react-redux'
import Immutable from 'immutable' /* eslint-disable new-cap */
import actions from 'actions'
import DuplicateOrderModal from './DuplicateOrderModal'

function mapStateToProps(state) {
  return {
    closeOrders: state
      .temp
      .get('closeOrderIds', Immutable.Map([]))
      .map(orderId =>
        state.user.get('orders')
          .filter(order => order.get('id') === orderId)
          .first()
      )
      .filter(order => !!order),
  }
}

const DuplicateOrderModalContainer = connect(mapStateToProps, {
  close: () => actions.temp('closeOrderIds', Immutable.Map([])),
})(DuplicateOrderModal)

export default DuplicateOrderModalContainer
