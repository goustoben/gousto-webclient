import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Field, FormSection } from 'redux-form'
import ReduxFormInput from 'Form/ReduxFormInput'
import { onEnter } from 'utils/accessibility'
import { checkoutClickContinueToDelivery } from 'actions/trackingKeys'
import { ErrorMessage } from '../ErrorMessage'
import { SectionHeader } from '../SectionHeader'
import { CheckoutButton } from '../CheckoutButton'
import { PasswordCriteria } from '../PasswordCriteria'
import { fieldsConfig } from './fieldsConfig'
import css from './AboutYou.css'
import checkoutCss from '../../Checkout.css'

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
    const { submit, trackUTMAndPromoCode, checkoutValid } = this.props
    if (checkoutValid) {
      trackUTMAndPromoCode(checkoutClickContinueToDelivery)
    }
    submit()
  }

  renderLoginButton = () => {
    const { onLoginClick } = this.props

    return (
      <span className={css.emailLabelContainer}>
        Email address
        <span className={css.account}>
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
      isPassStrengthEnabled,
      passwordErrors,
      passwordValue,
      isMobile,
    } = this.props
    const { isPassVisible, isPassCriteriaVisible, showFailedCriteria } = this.state
    const passState = {
      isPassStrengthEnabled,
      isPassVisible,
      togglePasswordVisibility: this.togglePasswordVisibility,
    }
    const fields = fieldsConfig({
      loginCTA: this.renderLoginButton,
      sectionName,
      passState,
    })

    return fields.map((item) => {
      const isPasswordField = isPassStrengthEnabled && item.name === 'password'

      return (
        <div key={item.name} className={css.row}>
          <div className={checkoutCss.inputContainer}>
            <Field
              name={item.name}
              component={ReduxFormInput}
              inputType={item.inputType}
              type={item.type || null}
              label={item.label || null}
              subLabel={item.subLabel || null}
              mask
              withRef
              ref={receiveRef || null}
              refId={item.refId || null}
              dataTesting={item.dataTesting}
              validate={item.validate || null}
              childLabel={item.childLabel || null}
              childLabelClassName={item.childLabelClassName || null}
              style={item.style || null}
              isPassStrengthEnabled={isPasswordField}
              inputSuffix={item.inputSuffix || null}
              onFocus={isPasswordField ? this.toggleCriteria : () => {}}
              onCustomPasswordBlur={isPasswordField ? this.toggleFailedCriteria : () => {}}
              isMobile={isMobile}
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
    })
  }

  render() {
    const { sectionName, submitting, checkoutValid } = this.props

    return (
      <FormSection name={sectionName}>
        <div className={checkoutCss.sectionContainer} data-testing="checkoutAboutYouSection">
          <SectionHeader title="Create account" />
          {this.renderFields()}
          <CheckoutButton
            onClick={this.handleSubmit}
            submitting={submitting}
            isDisabled={!checkoutValid}
            stepName="Continue to Delivery"
          />
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
  submit: PropTypes.func,
  submitting: PropTypes.bool,
  trackUTMAndPromoCode: PropTypes.func,
  onLoginClick: PropTypes.func,
  isPassStrengthEnabled: PropTypes.bool,
  passwordErrors: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  passwordValue: PropTypes.string,
  isMobile: PropTypes.bool,
  checkoutValid: PropTypes.bool,
}

AboutYou.defaultProps = {
  clearErrors: () => {},
  sectionName: 'account',
  receiveRef: () => {},
  submit: () => {},
  trackUTMAndPromoCode: () => {},
  submitting: false,
  onLoginClick: () => {},
  isPassStrengthEnabled: false,
  passwordErrors: '',
  passwordValue: '',
  isMobile: true,
  checkoutValid: false,
}

export { AboutYou }
