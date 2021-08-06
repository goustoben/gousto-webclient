import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import { Loader } from 'goustouicomponents'
import css from './CheckoutButton.css'

const CheckoutButton = ({
  onClick,
  stepName,
  isDisabled,
  testingSelector,
  isFullWidth,
  isLoading,
}) => {
  const className = classNames(css.cta, {
    [css.isDisabled]: isDisabled,
    [css.isFullWidth]: isFullWidth,
  })

  return (
    <button
      className={className}
      data-testing={testingSelector}
      disabled={isDisabled || isLoading}
      onClick={onClick}
      onKeyDown={onClick}
      type="button"
    >
      {isLoading ? (
        <span className={css.loaderContainer}>
          <Loader color="White" />
        </span>
      ) : (
        stepName
      )}
    </button>
  )
}

CheckoutButton.propTypes = {
  stepName: PropTypes.string,
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
  testingSelector: PropTypes.string,
  isFullWidth: PropTypes.bool,
  isLoading: PropTypes.bool,
}

CheckoutButton.defaultProps = {
  onClick: () => {},
  stepName: '',
  isDisabled: false,
  testingSelector: 'checkoutCTA',
  isFullWidth: true,
  isLoading: false,
}

export { CheckoutButton }
