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
        `&ref=${orderId}` +
        `&amount=${total}` +
        (promoCode ? `&vc=${promoCode}` : '') +
        `&merchant=${MERCHANT_ID}` +
        `&parts=${commissionGroup}:${total}`
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

export {
  AwinPixel
}
