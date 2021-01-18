import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import css from './ReceiptLine.css'

const ReceiptLine = ({ label, children, style, showLineAbove, dataTesting, isCheckoutOverhaulEnabled }) => (
  <div>
    {
      showLineAbove
        ? <div className={classnames(css.horizontalLineAbove, { [css.redesignLine]: isCheckoutOverhaulEnabled })} />
        : null
    }
    <p
      className={classnames(css.receiptLine,
        { [css.small]: style === 'small' },
        { [css.normal]: style === 'normal' },
        { [css.bold]: style === 'bold' },
        { [css.primary]: style === 'primary' },
        { [css.highlighted]: style === 'highlighted' },
        { [css.primaryRedesign]: style === 'primary' && isCheckoutOverhaulEnabled },
        { [css.boldRedesign]: style === 'bold' && isCheckoutOverhaulEnabled },
        { [css.normalRedesign]: style === 'normal' && isCheckoutOverhaulEnabled },
      )}
    >
      <span className={classnames(css.label, { [css.truncateLabel]: style === 'truncateLabel' })}>{label}</span>
      <span className={css.content} data-testing={dataTesting}>{children}</span>
    </p>
  </div>
)

ReceiptLine.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.oneOf(['small', 'normal', 'bold', 'primary', 'highlighted', 'truncateLabel']),
  showLineAbove: PropTypes.bool,
  dataTesting: PropTypes.string,
  isCheckoutOverhaulEnabled: PropTypes.bool,
}

ReceiptLine.defaultProps = {
  showLineAbove: false,
  dataTesting: null,
  isCheckoutOverhaulEnabled: false,
}

export default ReceiptLine
