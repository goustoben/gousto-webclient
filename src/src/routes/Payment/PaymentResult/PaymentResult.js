import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import css from './PaymentResult.css'

class PaymentResult extends PureComponent {
  render() {
    const { success, header, children } = this.props

    return (
      <div>
        {header && <h3 className={success ? css.successHeader : css.failureHeader}>{header}</h3>}
        <div className={css.content}>{children}</div>
      </div>
    )
  }
}

PaymentResult.propTypes = {
  header: PropTypes.string,
  children: PropTypes.node,
  success: PropTypes.bool,
}

PaymentResult.defaultProps = {
  header: null,
  children: null,
  success: null,
}

export { PaymentResult }
