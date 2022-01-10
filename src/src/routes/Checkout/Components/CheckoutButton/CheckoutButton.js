import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import { Loader } from 'goustouicomponents'
import { jsx } from '@emotion/react'
import { Button } from '@gousto-internal/citrus-react'
import css from './CheckoutButton.css'

const CheckoutButton = ({
  onClick,
  isDisabled,
  testingSelector,
  isFullWidth,
  isLoading,
  children,
  variant,
  noHorizontalPadding,
}) => {
  const className = classNames(css.cta, {
    [css.isDisabled]: isDisabled,
    [css.isFullWidth]: isFullWidth,
    [css.secondary]: variant === 'secondary',
    [css.noHorizontalPadding]: noHorizontalPadding,
  })

  return (
    <>
      {/* <button
        className={className}
        data-testing={testingSelector}
        disabled={isDisabled || isLoading}
        onClick={onClick}
        onKeyDown={onClick}
        type="submit"
      >
        {isLoading ? (
          <span className={css.loaderContainer}>
            <Loader color="White" />
          </span>
        ) : (
          children
        )}
      </button> */}
      <Button
        data-testing={testingSelector}
        disabled={!!(isDisabled || isLoading)}
        onClick={onClick}
        onKeyDown={onClick}
        width={isFullWidth && '100%'}
      >
        {isLoading ? (
          <span className={css.loaderContainer}>
            <Loader color="White" />
          </span>
        ) : (
          children
        )}
      </Button>
    </>
  )
}

CheckoutButton.propTypes = {
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
  testingSelector: PropTypes.string,
  isFullWidth: PropTypes.bool,
  isLoading: PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'secondary']),
  children: PropTypes.node.isRequired,
  noHorizontalPadding: PropTypes.bool,
}

CheckoutButton.defaultProps = {
  onClick: () => {},
  isDisabled: false,
  testingSelector: 'checkoutCTA',
  isFullWidth: true,
  isLoading: false,
  variant: 'primary',
  noHorizontalPadding: false,
}

export { CheckoutButton }
