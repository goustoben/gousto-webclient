import React from 'react'
import PropTypes from 'prop-types'

const MERCHANT_ID = 5070

const AwinPixel = ({ show, orderId, total, commissionGroup, promoCode }) => (
  (show) ? (
    <img
      alt=""
      src={
        `https://www.awin1.com/sread.img` +
        `?tt=ns` +
        `&tv=2` +
        `&cr=GBP` +
        `&merchant=${MERCHANT_ID}` +
        (total ? `&amount=${total}` : '') +
        (orderId ? `&ref=${orderId}` : '') +
        (promoCode ? `&vc=${promoCode}` : '') +
        (commissionGroup && total ? `&parts=${commissionGroup}:${total}` : '')
      }
    />
  ) : null
)

AwinPixel.propTypes = {
  show: PropTypes.bool,
  total: PropTypes.string,
  orderId: PropTypes.string,
  promoCode: PropTypes.string,
  commissionGroup: PropTypes.string,
}

AwinPixel.defaultProps = {
  show: false,
  total: '',
  orderId: '',
  promoCode: '',
  commissionGroup: '',
}

export {
  AwinPixel
}
