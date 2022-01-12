import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import { Text, FontWeight, Box, FlexDirection, JustifyContent, Color } from '@gousto-internal/citrus-react'
import css from './ReceiptLine.css'

export const ReceiptLine = ({
  label,
  children,
  lineStyle,
  showLineAbove,
  dataTesting,
  isReceiptInCheckout,
}) => {
  const getLineStyleAttributes = () => {
    switch (lineStyle) {
    case 'checkoutBold':
      return {fontWeight: FontWeight.Bold, paddingBottom: 5, color: Color.Inherit, size: 3}
    case 'checkoutPrimary':
      return {fontWeight: FontWeight.SemiBold, paddingBottom: 0, color: Color.Success_800, size: null}
    default:
      return {fontWeight: FontWeight.Inherit, paddingBottom: 0, color: Color.Inherit, size: null}
    }
  }

  const { fontWeight, color, size, paddingBottom } = getLineStyleAttributes()

  return (
    <div>
      {
        showLineAbove
          ? <div className={classnames(css.horizontalLineAbove, { [css.checkoutLine]: isReceiptInCheckout })} />
          : null
      }
      {/* <p
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
        <span className={classnames(css.label, { [css.truncateLabel]: lineStyle === 'truncateLabel' })}>
          {label}
        </span>
        <span className={css.content} data-testing={dataTesting}>{children}</span>
      </p> */}
      <Box display="flex" flexDirection={FlexDirection.Row} paddingBottom={paddingBottom} justifyContent={JustifyContent.SpaceBetween}>
        <Text fontWeight={fontWeight} color={color} size={size}>{label}</Text>
        <Text fontWeight={fontWeight} data-testing={dataTesting} color={color} size={size}>{children}</Text>
      </Box>
    </div>
  )
}

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
