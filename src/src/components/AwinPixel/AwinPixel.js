import React from 'react'
import PropTypes from 'prop-types'

const MERCHANT_ID = 5070

const AwinPixel = ({ show, orderId, total, commissionGroup, promoCode }) => {
  if (!show) {
    return null
  }

  return (
    <img
      alt=""
      src={
        `${'https://www.awin1.com/sread.img'
        + '?tt=ns'
        + '&tv=2'
        + '&cr=GBP'
        + `&merchant=${MERCHANT_ID}`}${
          total ? `&amount=${total}` : ''
        }${orderId ? `&ref=${orderId}` : ''
        }${promoCode ? `&vc=${promoCode}` : ''
        }${commissionGroup && total ? `&parts=${commissionGroup}:${total}` : ''}`
      }
    />
  )
}

AwinPixel.propTypes = {
  show: PropTypes.bool,
  total: PropTypes.string,
  orderId: PropTypes.string,
  promoCode: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  commissionGroup: PropTypes.string,
}

AwinPixel.defaultProps = {
  show: false,
  total: '',
  orderId: '',
  promoCode: false,
  commissionGroup: '',
}

export {
  AwinPixel
}
