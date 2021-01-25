import PropTypes from 'prop-types'
import React, { PureComponent, Fragment } from 'react'
import { Field, FormSection } from 'redux-form'
import classNames from 'classnames'
import ReduxFormInput from 'Form/ReduxFormInput'
import { onEnter } from 'utils/accessibility'
import { Login } from 'Login'
import ModalPanel from 'Modal/ModalPanel'
import Overlay from 'Overlay'
import { CTA } from 'goustouicomponents'
import { ErrorMessage } from '../ErrorMessage'
import { SectionHeader } from '../SectionHeader'
import { fieldsConfig } from './fieldsConfig'
import css from './AboutYou.css'
import redesignCss from '../../CheckoutRedesignContainer.css'

class AboutYou extends PureComponent {
  componentDidMount() {
    const { clearErrors } = this.props
    clearErrors()
  }

  handleLoginClose = (e) => {
    const { loginVisibilityChange } = this.props
    if (e) {
      e.stopPropagation()
    }
    loginVisibilityChange(false)
  }

  handleLoginOpen = (e) => {
    const { loginVisibilityChange } = this.props
    e.stopPropagation()
    loginVisibilityChange(true)
  }

  onLoginClick = (e) => {
    const { trackCheckoutButtonPressed, isMobile, isAuthenticated, } = this.props
    if (!isAuthenticated) {
      this.handleLoginOpen(e)
    }
    if (isMobile) {
      trackCheckoutButtonPressed('LogInCTA Clicked')
    }
  }

  handleSubmit = () => {
    const { createAccountValues, userProspect, submit, trackUTMAndPromoCode } = this.props
    const { email, password } = createAccountValues
    if (email && password) {
      trackUTMAndPromoCode('checkout_click_continue_to_delivery')
      userProspect()
    }
    submit()
  }

  renderLoginButton = () => {
    const { isCheckoutOverhaulEnabled } = this.props
    const loginCTA = (
      <span
        className={classNames(css.link, { [css.linkRedesign]: isCheckoutOverhaulEnabled })}
        role="button"
        tabIndex="0"
        onClick={this.onLoginClick}
        onKeyDown={onEnter(this.onLoginClick)}
      >
        {isCheckoutOverhaulEnabled
          ? 'Log in'
          : (
            <Fragment>
              Log in here&nbsp;
              <span className={css.arrowRight} />
            </Fragment>
          )
        }
      </span>
    )

    if (isCheckoutOverhaulEnabled) {
      return (
        <span className={css.emailLabelContainer}>
          Email address
          <span className={css.account}>
            Have an account?&nbsp;
            {loginCTA}
          </span>
        </span>
      )
    }

    return (
      <div className={css.infoSection}>
        <p className={css.textSMNoMargin}>
          Already a customer?&nbsp;
          {loginCTA}
        </p>
      </div>
    )
  }

  renderFields = () => {
    const { isCheckoutOverhaulEnabled, sectionName, receiveRef } = this.props
    const fields = fieldsConfig({ isCheckoutOverhaulEnabled, loginCTA: this.renderLoginButton, sectionName })

    return fields.map(item => (
      <div
        key={item.name}
        className={classNames(css.row, { [css.rowRedesign]: isCheckoutOverhaulEnabled })}
      >
        <div className={classNames(css.colHalf, { [redesignCss.inputContainer]: isCheckoutOverhaulEnabled })}>
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
            isCheckoutOverhaulEnabled={isCheckoutOverhaulEnabled}
          />
        </div>
      </div>
    ))
  }

  render() {
    const {
      sectionName,
      receiveRef,
      isLoginOpen,
      isCheckoutOverhaulEnabled,
      submitting,
      createAccountValues,
    } = this.props
    const { email, password } = createAccountValues

    return (
      <FormSection name={sectionName}>
        <div
          className={classNames(css.aboutYouContainer, {
            [redesignCss.sectionRedesignContainer]: isCheckoutOverhaulEnabled
          })}
          data-testing="checkoutAboutYouSection"
        >
          <div>
            {isCheckoutOverhaulEnabled
              ? <SectionHeader title="Create account" />
              : <h3 className={css.header}>About you</h3>}
            {!isCheckoutOverhaulEnabled && (
              <Fragment>
                <span className={css.boldInfo}>All fields are required</span>
                {this.renderLoginButton()}
              </Fragment>
            )}
          </div>
          {!isCheckoutOverhaulEnabled && (
            <Fragment>
              <div className={css.row}>
                <div className={css.colSM}>
                  <Field
                    name="firstName"
                    component={ReduxFormInput}
                    inputType="Input"
                    label="First name"
                    mask
                    withRef
                    ref={receiveRef}
                    refId={`${sectionName}.firstName`}
                    dataTesting="checkoutFirstNameInput"
                  />
                </div>
                <div className={css.colSM}>
                  <Field
                    name="lastName"
                    component={ReduxFormInput}
                    inputType="Input"
                    label="Last name"
                    mask
                    withRef
                    ref={receiveRef}
                    refId={`${sectionName}.lastName`}
                    dataTesting="checkoutLastNameInput"
                  />
                </div>
              </div>
            </Fragment>
          )}
          {this.renderFields()}
          {isCheckoutOverhaulEnabled && (
            <CTA
              testingSelector="checkoutCTA"
              onClick={this.handleSubmit}
              isLoading={submitting}
              isFullWidth
              isDisabled={!email || !password}
              size="small"
            >
              Continue to Delivery
            </CTA>
          )}
          <Overlay
            open={isLoginOpen}
            contentClassName={css.modalOverlay}
            from="top"
          >
            <ModalPanel
              closePortal={this.handleLoginClose}
              className={css.modal}
              containerClassName={css.modalContainer}
              disableOverlay
              isNarrow
            >
              <Login />
            </ModalPanel>
          </Overlay>
        </div>
        <ErrorMessage />
      </FormSection>
    )
  }
}

AboutYou.propTypes = {
  loginVisibilityChange: PropTypes.func,
  isLoginOpen: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  isMobile: PropTypes.bool,
  sectionName: PropTypes.string,
  clearErrors: PropTypes.func,
  receiveRef: PropTypes.func,
  trackCheckoutButtonPressed: PropTypes.func,
  isCheckoutOverhaulEnabled: PropTypes.bool,
  submit: PropTypes.func,
  userProspect: PropTypes.func,
  submitting: PropTypes.bool,
  trackUTMAndPromoCode: PropTypes.func,
  createAccountValues: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }),
}

AboutYou.defaultProps = {
  clearErrors: () => { },
  loginVisibilityChange: () => { },
  isLoginOpen: false,
  isAuthenticated: false,
  sectionName: 'aboutyou',
  receiveRef: () => { },
  trackCheckoutButtonPressed: () => { },
  isMobile: false,
  isCheckoutOverhaulEnabled: false,
  submit: () => { },
  userProspect: () => { },
  trackUTMAndPromoCode: () => { },
  submitting: false,
  createAccountValues: {},
}

export { AboutYou }
