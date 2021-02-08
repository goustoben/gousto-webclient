import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
// eslint-disable-next-line import/no-unresolved
import formsCss from 'styles/forms.css'

const InputError = ({ isCheckoutOverhaulEnabled, children }) => (
  <p
    className={classNames(formsCss.errorMsg, {
      [formsCss.errorMessageCheckoutOverhaul]: isCheckoutOverhaulEnabled,
    })}
  >
    {children}
  </p>
)

InputError.propTypes = {
  children: PropTypes.node.isRequired,
  isCheckoutOverhaulEnabled: PropTypes.bool,
}

InputError.defaultProps = {
  isCheckoutOverhaulEnabled: false,
}

export default InputError
