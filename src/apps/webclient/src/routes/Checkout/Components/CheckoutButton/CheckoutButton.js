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
}) => (
  <Button
    colorVariant={
      variant === 'secondary' ? ButtonColorVariant.Secondary : ButtonColorVariant.Primary
    }
    type="submit"
    disabled={Boolean(isDisabled || isLoading)}
    onClick={onClick}
    onKeyDown={onClick}
    data-testing={testingSelector}
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
)

CheckoutButton.propTypes = {
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
  testingSelector: PropTypes.string,
  isFullWidth: PropTypes.bool,
  isLoading: PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'secondary']),
  children: PropTypes.node.isRequired,
}

CheckoutButton.defaultProps = {
  onClick: () => {},
  isDisabled: false,
  testingSelector: 'checkoutCTA',
  isFullWidth: true,
  isLoading: false,
  variant: 'primary',
}

export { CheckoutButton }
