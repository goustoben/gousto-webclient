import React, { useEffect } from 'react'

import PropTypes from 'prop-types'

import routesConfig from 'config/routes'
import { CheckoutButton } from 'routes/Checkout/Components/CheckoutButton/CheckoutButton'
import { InformationalPageTemplate } from 'routes/Signup/Components/InformationalPageTemplate'

import css from './CheckAccountPage.css'

export const CheckAccountPage = ({
  isAuthenticated,
  redirect,
  signupCheckAccountGoToBoxPrices,
  signupCheckAccountLogin,
}) => {
  useEffect(() => {
    if (isAuthenticated) {
      redirect(`${routesConfig.client.signup}/apply-voucher`)
    }
    // No redirect here when going not-logged-in->logged-in because that one is
    // handled in postLoginSteps.

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirect])

  if (isAuthenticated) {
    return null
  }

  return (
    <InformationalPageTemplate
      testingSelector="checkAccountPage"
      isGoustoOnDemandEnabled
      headerText="Are you new to Gousto?"
    >
      <div className={css.ctaContainer}>
        <CheckoutButton
          onClick={signupCheckAccountGoToBoxPrices}
          isFullWidth
          testingSelector="checkAccountNewCustomerCTA"
          noHorizontalPadding
        >
          Yes, I’m a new customer
        </CheckoutButton>
      </div>
      <div className={css.ctaContainer}>
        <CheckoutButton
          variant="secondary"
          onClick={signupCheckAccountLogin}
          isFullWidth
          testingSelector="checkAccountExistingCustomerCTA"
          noHorizontalPadding
        >
          No, I already have an account
        </CheckoutButton>
      </div>
    </InformationalPageTemplate>
  )
}

CheckAccountPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  redirect: PropTypes.func.isRequired,
  signupCheckAccountGoToBoxPrices: PropTypes.func.isRequired,
  signupCheckAccountLogin: PropTypes.func.isRequired,
}
