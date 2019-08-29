import { connect } from 'react-redux'
import actions from 'actions'
import MyGousto from './MyGousto'

function mapStateToProps(state) {
  return {
    card: state.user.get('card'),
    orders: state.user.get('orders'),
    nameFirst: state.user.get('nameFirst')
  }
}

const MyGoustoContainer = connect(mapStateToProps, {
  userLoadOrders: actions.userLoadOrders,
})(MyGousto)

export default MyGoustoContainer
