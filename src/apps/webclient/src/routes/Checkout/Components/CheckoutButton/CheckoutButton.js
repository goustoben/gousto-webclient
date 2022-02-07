import { Button, ButtonColorVariant } from '@gousto-internal/citrus-react'
import PropTypes from 'prop-types'
import React from 'react'
import { Loader } from 'goustouicomponents'
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
  return (
    <Button
      colorVariant={
        variant === 'secondary' ? ButtonColorVariant.Secondary : ButtonColorVariant.PrimaryButton
      }
      type="submit"
      disabled={!!(isDisabled || isLoading)}
      onClick={onClick}
      onKeyDown={onClick}
      data-testing={testingSelector}
      width={isFullWidth && '100%'}
      height="3rem"
    >
      {isLoading ? (
        <span className={css.loaderContainer}>
          <Loader color="White" />
        </span>
      ) : (
        children
      )}
    </Button>
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
