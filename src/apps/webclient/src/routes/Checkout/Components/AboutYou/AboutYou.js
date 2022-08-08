import React, { PureComponent } from 'react'

import { Box, Display, Link, Text, FontFamily } from '@gousto-internal/citrus-react'
import { ReduxFormInput } from 'Form/ReduxFormInput'
import Immutable from 'immutable'
import PropTypes from 'prop-types'
import { Field, FormSection } from 'redux-form'

import {
  checkoutClickContinueToApplePay,
  checkoutClickContinueToDelivery,
  checkoutClickPrivacyPolicy,
} from 'actions/trackingKeys'
import { CheckoutStepIds } from 'routes/Checkout/checkoutConfig'
import { onEnter } from 'utils/accessibility'

import { CheckoutButton } from '../CheckoutButton'
import { ErrorMessage } from '../ErrorMessage'
import { PasswordCriteria } from '../PasswordCriteria'
import { SectionHeader } from '../SectionHeader'
import { PasswordField } from './PasswordField'
import { fieldsConfig } from './fieldsConfig'

import checkoutCss from '../../Checkout.css'
import css from './AboutYou.css'

class AboutYou extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isPassVisible: false,
      isPassCriteriaVisible: false,
    }
  }

  componentDidMount() {
    const { clearErrors } = this.props
    clearErrors()
  }

  handleSubmit = () => {
    const { submit, trackUTMAndPromoCode, checkoutValid, userProspect, change } = this.props
    if (checkoutValid) {
      trackUTMAndPromoCode(checkoutClickContinueToDelivery)
    }
    userProspect()
    change('nextStepId', CheckoutStepIds.DELIVERY)
    setTimeout(submit, 0)
  }

  handleApplePaySubmit = () => {
    const { submit, trackUTMAndPromoCode, checkoutValid, userProspect, change } = this.props
    if (checkoutValid) {
      trackUTMAndPromoCode(checkoutClickContinueToApplePay)
    }
    userProspect()
    change('nextStepId', CheckoutStepIds.APPLE_PAY)
    /**
     * setTimeout is required to make `change -> submit` functions sequence work as expected.
     * Without timeout `submit` will run before `change`
     * and `onSubmit` callback would not have necessary info -- nextStepId.
     */
    setTimeout(submit, 0)
  }

  renderLoginButton = () => {
    const { onLoginClick, isGoustoOnDemandEnabled } = this.props

    return (
      <Box display={Display.Flex} alignItems="center" justifyContent="space-between">
        <Text fontFamily={FontFamily.SemiBold}>Email address</Text>
        <Box>
          <Text size={1}>
            {!isGoustoOnDemandEnabled && (
              <>
                Have an account?&nbsp;
                {/* eslint-disable-next-line */}
                <Link
                  size={1}
                  role="button"
                  tabIndex="0"
                  variant="Text"
                  onClick={onLoginClick}
                  onKeyDown={onEnter(onLoginClick)}
                >
                  Log in
                </Link>
              </>
            )}
          </Text>
        </Box>
      </Box>
    )
  }

  togglePasswordVisibility = () => {
    this.setState((prevStatus) => ({
      isPassVisible: !prevStatus.isPassVisible,
    }))
  }

  toggleCriteria = () => {
    this.setState({
      isPassCriteriaVisible: true,
    })
  }

  toggleFailedCriteria = () => {
    this.setState({
      showFailedCriteria: true,
    })
  }

  renderFields = () => {
    const {
      sectionName,
      receiveRef,
      passwordErrors,
      isMobile,
      passwordValue,
      trackUTMAndPromoCode,
      validatePassword,
    } = this.props
    const { isPassVisible, isPassCriteriaVisible, showFailedCriteria } = this.state
    const passState = {
      isPassVisible,
      togglePasswordVisibility: this.togglePasswordVisibility,
    }
    const fields = fieldsConfig({
      loginCTA: this.renderLoginButton,
      sectionName,
      passState,
      trackPrivacyPolicyClick: () => trackUTMAndPromoCode(checkoutClickPrivacyPolicy),
    })

    return fields.map((item) => {
      const isPasswordField = item.name === 'password'

      if (isPasswordField) {
        return (
          <div key={item.name} className={css.row}>
            <div className={checkoutCss.inputContainer}>
              <PasswordField
                name={item.name}
                type={item.type}
                label={item.label || null}
                dataTesting={item.dataTesting}
                inputSuffix={item.inputSuffix}
                onFocus={this.toggleCriteria}
                onCustomPasswordBlur={this.toggleFailedCriteria}
                isMobile={isMobile}
                validatePassword={validatePassword}
                passwordErrors={passwordErrors}
                passwordValue={passwordValue}
              />
            </div>
            {isPassCriteriaVisible && isPasswordField && (
              <PasswordCriteria
                password={passwordValue}
                passwordErrors={passwordErrors}
                showFailedCriteria={showFailedCriteria}
              />
            )}
          </div>
        )
      }

      return (
        <div key={item.name} className={css.row}>
          <div className={checkoutCss.inputContainer}>
            <Field
              name={item.name}
              component={ReduxFormInput}
              inputType={item.inputType}
              autoComplete={item.autoComplete || 'off'}
              type={item.type || null}
              label={item.label || null}
              mask
              forwardRef
              ref={receiveRef || null}
              refId={item.refId || null}
              dataTesting={item.dataTesting}
              validate={item.validate || null}
              childLabel={item.childLabel || null}
              childLabelClassName={item.childLabelClassName || null}
              style={item.style || null}
            />
          </div>
        </div>
      )
    })
  }

  render() {
    const {
      sectionName,
      submitting,
      checkoutValid,
      passwordValue,
      passwordErrors,
      isGoustoOnDemandEnabled,
      isApplePayEnabled,
    } = this.props
    const disableCTA =
      !passwordValue || !checkoutValid || (passwordErrors.length !== 0 && passwordValue)
    const sectionSubtitle = isGoustoOnDemandEnabled
      ? 'Create an account to manage your order, track delivery or cancel/reschedule if needed.'
      : ''

    return (
      <FormSection name={sectionName}>
        <div className={checkoutCss.sectionContainer} data-testing="checkoutAboutYouSection">
          <SectionHeader title="Create account" subtitle={sectionSubtitle} />
          {this.renderFields()}
          <CheckoutButton
            onClick={this.handleSubmit}
            submitting={submitting}
            isDisabled={disableCTA}
          >
            Continue to Delivery
          </CheckoutButton>
          {isApplePayEnabled && (
            <CheckoutButton
              onClick={this.handleApplePaySubmit}
              submitting={submitting}
              isDisabled={disableCTA}
              isApplePay
            >
              Checkout with Apple Pay
            </CheckoutButton>
          )}
        </div>
        <ErrorMessage />
      </FormSection>
    )
  }
}

AboutYou.propTypes = {
  sectionName: PropTypes.string,
  clearErrors: PropTypes.func,
  receiveRef: PropTypes.func,
  /**
   * Submits page form by doing following:
   * - Validates all fields.
   * - Navigates to next step if current is not last or submits whole checkout order.
   */
  submit: PropTypes.func,
  /**
   * Updates form field. Used to configure nextStepId when "Proceed" button is clicked.
   */
  change: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  trackUTMAndPromoCode: PropTypes.func,
  onLoginClick: PropTypes.func,
  passwordErrors: PropTypes.oneOfType([
    PropTypes.instanceOf(Immutable.List),
    PropTypes.arrayOf(PropTypes.string),
  ]),
  isMobile: PropTypes.bool,
  checkoutValid: PropTypes.bool,
  passwordValue: PropTypes.string,
  validatePassword: PropTypes.func,
  isGoustoOnDemandEnabled: PropTypes.bool,
  userProspect: PropTypes.func,
  isApplePayEnabled: PropTypes.bool.isRequired,
}

AboutYou.defaultProps = {
  clearErrors: () => {},
  sectionName: 'account',
  receiveRef: () => {},
  submit: () => {},
  trackUTMAndPromoCode: () => {},
  submitting: false,
  onLoginClick: () => {},
  passwordErrors: Immutable.List([]),
  isMobile: true,
  checkoutValid: false,
  passwordValue: '',
  validatePassword: () => {},
  isGoustoOnDemandEnabled: false,
  userProspect: () => {},
}

export { AboutYou }
