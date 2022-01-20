import { connect } from 'react-redux'
import { getUserOrderById } from 'utils/user'
import { AwinPixel } from 'AwinPixel'

const mapStateToProps = (state, ownProps) => {
  const { orderId } = ownProps
  const order = getUserOrderById(orderId, state.user.get('orders'))
  const total = order.getIn(['prices', 'total'])
  const promoCode = order.getIn(['prices', 'promoCode'])

  return {
    show: Boolean(orderId && total && order),
    commissionGroup: 'FIRSTPURCHASE',
    orderId,
    total,
    promoCode,
  }
}

export const AwinPixelContainer = connect(
  mapStateToProps,
)(AwinPixel)
