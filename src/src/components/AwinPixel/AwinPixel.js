import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { logLevels } from "actions/log/logLevels"
import { feLoggingLogEvent } from "actions/log/feLoggingLogEvent"

const MERCHANT_ID = 5070

const AwinPixel = ({ show, orderId, total, commissionGroup, promoCode, dispatch }) => {
  const src = [
    `https://www.awin1.com/sread.img?tt=ns&tv=2&cr=GBP&merchant=${MERCHANT_ID}`,
    total ? `&amount=${total}` : null,
    orderId ? `&ref=${orderId}` : null,
    promoCode ? `&vc=${promoCode}` : null,
    commissionGroup && total ? `&parts=${commissionGroup}:${total}` : null,
  ]
    .filter((part) => part !== null)
    .join('')

  useEffect(() => {
    const awinPixelProps = { show, orderId, total, commissionGroup, promoCode }

    dispatch(
      feLoggingLogEvent(
        logLevels.info,
        `render AwinPixel: ${show ? 'returning img' : 'returning null'}`,
        {
          awinPixelProps,
          src,
        }
      )
    )
  }, [show, orderId, total, commissionGroup, promoCode, src, dispatch])

  if (!show) {
    return null
  }

  return <img alt="" src={src} />
}

AwinPixel.propTypes = {
  show: PropTypes.bool,
  total: PropTypes.string,
  orderId: PropTypes.string,
  promoCode: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  commissionGroup: PropTypes.string,
  dispatch: PropTypes.func.isRequired,
}

AwinPixel.defaultProps = {
  show: false,
  total: '',
  orderId: '',
  promoCode: false,
  commissionGroup: '',
}

export { AwinPixel }
