import { connect } from 'react-redux'
import Immutable from 'immutable'
import { userLoadOrder } from 'actions/user'
import MyGousto from './MyGousto'

function mapStateToProps(state) {
  return {
    // card: state.user.get('card'),
    // orders: state.user.get('orders'),

    // Card expiry
    card: Immutable.Map({
      lastFourDigits: "",
      expiring: false,
      expiryDate: '2019-08',
    }),

    // Amend delivery date
    // orders: Immutable.Map({
    //   1234: {
    //     state: 'pending',
    //     original_delivery_day: true,
    //   }
    // }),

    //Order selection
    orders: Immutable.Map({
      1234: {
        state: 'pending',
        default: '1',
        original_delivery_day: true,
      },
      5678: {
        state: 'pending',
        default: '1',
      },
    }),
  }
}

const MyGoustoContainer = connect(mapStateToProps, {
  userLoadOrder,
})(MyGousto)

export default MyGoustoContainer
