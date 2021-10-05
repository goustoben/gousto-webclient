import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import css from './ReceiptLine.css'

const ReceiptLine = ({
  label,
  children,
  lineStyle,
  showLineAbove,
  dataTesting,
  isReceiptInCheckout,
}) => (
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
      <span className={classnames(css.label, { [css.truncateLabel]: lineStyle === 'truncateLabel' })}>{label}</span>
      <span className={css.content} data-testing={dataTesting}>{children}</span>
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

export default ReceiptLine
