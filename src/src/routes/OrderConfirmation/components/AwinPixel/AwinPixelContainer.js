import { connect } from 'react-redux'

import { AwinPixel } from 'AwinPixel'

const getAwinOrderId = (state) => state.basket.getIn(['orderDetails', 'id'])
const getAwinOrderTotal = (state) => state.basket.getIn(['orderDetails', 'prices', 'total'])
const getAwinOrderPromoCode = (state) => state.basket.getIn(['orderDetails', 'prices', 'promoCode'])
const hasAwinOrder = (state) => state.basket.getIn(['orderDetails', 'prices'], null)

const mapStateToProps = (state) => ({
  show: getAwinOrderId(state) && getAwinOrderTotal(state) && hasAwinOrder(state),
  commissionGroup: 'EXISTING',
  orderId: getAwinOrderId(state),
  total: getAwinOrderTotal(state),
  promoCode: getAwinOrderPromoCode(state),
})

export const AwinPixelContainer = connect(
  mapStateToProps,
)(AwinPixel)
