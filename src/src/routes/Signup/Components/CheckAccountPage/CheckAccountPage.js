import React from 'react'
import PropTypes from 'prop-types'
import { InformationalPageTemplate } from 'routes/Signup/Components/InformationalPageTemplate'
import { CheckoutButton } from 'routes/Checkout/Components/CheckoutButton/CheckoutButton'
import css from './CheckAccountPage.css'

export const CheckAccountPage = ({ signupCheckAccountGoToBoxPrices, signupCheckAccountLogin }) => (
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

CheckAccountPage.propTypes = {
  signupCheckAccountGoToBoxPrices: PropTypes.func.isRequired,
  signupCheckAccountLogin: PropTypes.func.isRequired,
}
