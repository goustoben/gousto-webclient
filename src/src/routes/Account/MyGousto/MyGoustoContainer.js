import { connect } from 'react-redux'
import { userLoadOrder } from 'actions/user'
import MyGousto from './MyGousto'

function mapStateToProps(state) {
  return {
    card: state.user.get('card'),
    orders: state.user.get('orders'),
  }
}

const MyGoustoContainer = connect(mapStateToProps, {
  userLoadOrder,
})(MyGousto)

export default MyGoustoContainer
