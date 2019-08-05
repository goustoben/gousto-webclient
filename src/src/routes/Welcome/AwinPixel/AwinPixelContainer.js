import { connect } from 'react-redux'

import { getUserOrderById } from 'utils/user'
import {
  getBasketOrderId,
} from 'selectors/basket'

import { AwinPixel } from 'AwinPixel'

const mapStateToProps = (state) => {
  const orderId = getBasketOrderId(state)
  const order = getUserOrderById(orderId, state.user.get('orders'))
  const total = order.getIn(['prices', 'total'])
  const promoCode = order.getIn(['prices', 'promoCode'])

  return {
    show: orderId && total && order,
    commissionGroup: 'FIRSTPURCHASE',
    orderId,
    total,
    promoCode,
  }
}

export const AwinPixelContainer = connect(
  mapStateToProps,
)(AwinPixel)
