import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import { jsx } from '@emotion/react'
import { Text, FontWeight, Color } from '@gousto-internal/zest-react'
import css from './ReceiptLine.css'

export const ReceiptLine = ({
  label,
  children,
  lineStyle,
  showLineAbove,
  dataTesting,
  isReceiptInCheckout,
}) =>
// const zestLineStyleMapping = {
//   checkoutNormal: {fontWeight: FontWeight.Normal, color: Color.ColdGrey_800 },
//   checkoutPrimary: {fontWeight: FontWeight.SemiBold, color: Color.Success_800 },
//   checkoutBold: {fontWeight: FontWeight.SemiBold, color: Color.ColdGrey_800 },
// }

// const {fontWeight, color} = zestLineStyleMapping[lineStyle]

  (
    <div>
      {
        showLineAbove
          ? <div className={classnames(css.horizontalLineAbove, { [css.checkoutLine]: isReceiptInCheckout })} />
          : null
      }
      <p
        className={classnames(css.receiptLine,
          { [css.small]: lineStyle === 'small' },
          { [css.normal]: lineStyle === 'normal' },
          { [css.bold]: lineStyle === 'bold' },
          { [css.primary]: lineStyle === 'primary' },
          { [css.highlighted]: lineStyle === 'highlighted' },
          { [css.checkoutPrimary]: lineStyle === 'checkoutPrimary' },
          { [css.checkoutBold]: lineStyle === 'checkoutBold' },
          { [css.checkoutNormal]: lineStyle === 'checkoutNormal' },
        )}
      >
        <Text>
          {label}
        </Text>
        <Text>
          {children}
        </Text>
      </p>
    </div>
  )

ReceiptLine.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
  lineStyle: PropTypes.oneOf([
    'small',
    'normal',
    'bold',
    'primary',
    'highlighted',
    'truncateLabel',
    'checkoutPrimary',
    'checkoutBold',
    'checkoutNormal'
  ]),
  showLineAbove: PropTypes.bool,
  dataTesting: PropTypes.string,
  isReceiptInCheckout: PropTypes.bool,
}

ReceiptLine.defaultProps = {
  label: null,
  children: null,
  lineStyle: 'small',
  showLineAbove: false,
  dataTesting: null,
  isReceiptInCheckout: false,
}
