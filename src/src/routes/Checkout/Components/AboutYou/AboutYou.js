import PropTypes from 'prop-types'
import React from 'react'
import { Field, FormSection } from 'redux-form'
import ReduxFormInput from 'Form/ReduxFormInput'
import config from 'config/checkout'
import { capitalizeFirstLetter } from 'utils/text'
import { emailValidator } from 'utils/forms'
import Login from 'Login'
import ModalPanel from 'Modal/ModalPanel'
import Overlay from 'Overlay'
import css from './AboutYou.css'
import ErrorMessage from '../ErrorMessage'

class AboutYou extends React.PureComponent {
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
    this.setState({ loginPending: false })
  }

  handleLoginOpen = (e) => {
    const { loginVisibilityChange } = this.props
    e.stopPropagation()
    loginVisibilityChange(true)
  }

  render() {
    const { sectionName, trackCheckoutButtonPressed, isMobile, isAuthenticated, receiveRef, isLoginOpen, loginPending } = this.props
    const titles = config.titles.map(title => ({
      value: title,
      label: capitalizeFirstLetter(title),
    }))

    return (
      <FormSection name={sectionName}>
        <div className={css.aboutYouContainer} data-testing="checkoutAboutYouSection">
          <div>
            <h3 className={css.header}>About you</h3>
            <span className={css.boldInfo}>All fields are required</span>
            <div className={css.infoSection}>
              <p className={css.textSMNoMargin}>
                Already a customer?&nbsp;
                <span
                  className={css.link}
                  onClick={(e) => {
                    if (!isAuthenticated) this.handleLoginOpen(e)
                    if (isMobile) trackCheckoutButtonPressed('LogInCTA Clicked')
                  }}
                >
                  Log in here&nbsp;
                  <span className={css.arrowRight} />
                </span>
              </p>
            </div>
          </div>
          <div className={css.row}>
            <div className={css.colSM}>
              <Field
                name="title"
                component={ReduxFormInput}
                options={titles}
                inputType="DropDown"
                label="Title"
                withRef
                ref={receiveRef}
                refId={`${sectionName}.title`}
              />
            </div>
          </div>
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
          <div className={css.row}>
            <div className={css.colMD}>
              <Field
                name="email"
                component={ReduxFormInput}
                inputType="Input"
                type="email"
                label="Email address"
                subLabel="You'll use this to log in to your account"
                mask
                withRef
                ref={receiveRef}
                refId={`${sectionName}.email`}
                dataTesting="checkoutEmailInput"
                validate={emailValidator}
              />
            </div>
          </div>
          <div className={css.row}>
            <div className={css.colMD}>
              <Field
                name="password"
                component={ReduxFormInput}
                inputType="Input"
                type="password"
                label="Password"
                subLabel="Must be at least 8 characters"
                mask
                withRef
                ref={receiveRef}
                refId={`${sectionName}.password`}
                dataTesting="checkoutPasswordInput"
              />
            </div>
          </div>
          <div className={css.row}>
            <div className={css.colHalf}>
              <Field
                name="allowEmail"
                component={ReduxFormInput}
                inputType="CheckBox"
                childLabel="I'd like to receive the latest news and offers from Gousto, and be contacted occasionally for Customer Success purposes. I can unsubscribe at any time."
                style="disclaimer"
                mask
                dataTesting="checkoutAllowEmailCheckbox"
              />
            </div>
          </div>
          <Overlay
            open={isLoginOpen}
            className={css.mobileOverlay}
            contentClassName={css.mobileModalContent}
            from="top"
          >
            <ModalPanel
              closePortal={this.handleLoginClose}
              className={css.modal}
              containerClassName={css.modalContainer}
              disableOverlay
            >
              <Login
                isAuthenticated={isAuthenticated}
                isOpen={isLoginOpen}
                isPending={loginPending}
              />
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
  loginPending: PropTypes.bool,
  isMobile: PropTypes.bool,
  sectionName: PropTypes.string,
  clearErrors: PropTypes.func,
  receiveRef: PropTypes.func,
  trackCheckoutButtonPressed: PropTypes.func,
}

AboutYou.defaultProps = {
  clearErrors: () => { },
  loginVisibilityChange: () => { },
  isloginOpen: false,
  loginPending: false,
  isAuthenticated: false,
  sectionName: 'aboutyou',
  receiveRef: () => { },
  trackCheckoutButtonPressed: () => { },
  isMobile: false,
}

export { AboutYou }
