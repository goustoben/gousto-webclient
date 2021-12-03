import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import Immutable from 'immutable'
import { Field, FormSection } from 'redux-form'
import { ReduxFormInput } from 'Form/ReduxFormInput'
import classNames from 'classnames'
import { onEnter } from 'utils/accessibility'
import { checkoutClickContinueToDelivery, checkoutClickPrivacyPolicy } from 'actions/trackingKeys'
import { ErrorMessage } from '../ErrorMessage'
import { SectionHeader } from '../SectionHeader'
import { CheckoutButton } from '../CheckoutButton'
import { PasswordCriteria } from '../PasswordCriteria'
import { PasswordField } from './PasswordField'
import { fieldsConfig } from './fieldsConfig'
import css from './AboutYou.module.css'
import checkoutCss from '../../Checkout.module.css'

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
    const { submit, trackUTMAndPromoCode, checkoutValid, userProspect } = this.props
    if (checkoutValid) {
      trackUTMAndPromoCode(checkoutClickContinueToDelivery)
    }
    userProspect()
    submit()
  }

  renderLoginButton = () => {
    const { onLoginClick, isGoustoOnDemandEnabled } = this.props

    return (
      <span className={css.emailLabelContainer}>
        Email address
        <span className={classNames(css.account, { [css.isHidden]: isGoustoOnDemandEnabled })}>
          Have an account?&nbsp;
          <span
            className={css.link}
            role="button"
            tabIndex="0"
            onClick={onLoginClick}
            onKeyDown={onEnter(onLoginClick)}
          >
            Log in
          </span>
        </span>
      </span>
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

  submitForm = (e) => {
    if (e) {
      e.preventDefault()
    }
    this.handleSubmit()
  }

  render() {
    const {
      sectionName,
      submitting,
      checkoutValid,
      passwordValue,
      passwordErrors,
      isGoustoOnDemandEnabled,
    } = this.props
    const disableCTA =
      !passwordValue || !checkoutValid || (passwordErrors.length !== 0 && passwordValue)
    const sectionSubtitle = isGoustoOnDemandEnabled
      ? 'Create an account to manage your order, track delivery or cancel/reschedule if needed.'
      : ''

    return (
      <form id="create-account" onSubmit={this.submitForm} autoComplete="on">
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
          </div>
          <ErrorMessage />
        </FormSection>
      </form>
    )
  }
}

AboutYou.propTypes = {
  sectionName: PropTypes.string,
  clearErrors: PropTypes.func,
  receiveRef: PropTypes.func,
  submit: PropTypes.func,
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
