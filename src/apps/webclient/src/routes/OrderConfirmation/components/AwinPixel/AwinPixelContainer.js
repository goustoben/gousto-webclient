import { connect } from 'react-redux'

import { AwinPixel } from 'components/AwinPixel'
import {
  getBasketOrderTotal,
  getBasketOrderPrices,
  getBasketOrderDetailId,
  getBasketOrderPromoCode,
} from 'selectors/basket'

const mapStateToProps = (state) => ({
  show: Boolean(
    getBasketOrderDetailId(state) && getBasketOrderTotal(state) && getBasketOrderPrices(state),
  ),
  commissionGroup: 'EXISTING',
  orderId: getBasketOrderDetailId(state),
  total: getBasketOrderTotal(state),
  promoCode: getBasketOrderPromoCode(state),
})

export const AwinPixelContainer = connect(mapStateToProps)(AwinPixel)
