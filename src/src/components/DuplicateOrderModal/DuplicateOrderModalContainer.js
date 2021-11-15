import { connect } from 'react-redux'
import Immutable from 'immutable'
import DuplicateOrderModal from './DuplicateOrderModal'
import { temp } from "actions/temp/temp"

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
  close: () => temp('closeOrderIds', Immutable.Map([])),
})(DuplicateOrderModal)

export default DuplicateOrderModalContainer
