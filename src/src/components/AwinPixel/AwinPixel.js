import React from 'react'
import PropTypes from 'prop-types'

const MERCHANT_ID = 5070

const AwinPixel = ({ orderId, total, commissionGroup, promoCode }) => (
  <img
    alt=""
    src={
      `https://www.awin1.com/sread.img` +
      `?tt=ns` +
      `&tv=2` +
      `&cr=GBP` +
      `&ref=${orderId}` +
      `&amount=${total}` +
      `&vc=${promoCode}` +
      `&merchant=${MERCHANT_ID}` +
      `&parts=${commissionGroup}:${total}`
    }
  />
)

AwinPixel.propTypes = {
  orderId: PropTypes.string,
  total: PropTypes.string,
  commissionGroup: PropTypes.string,
  promoCode: PropTypes.string,
}

export {
  AwinPixel
}
