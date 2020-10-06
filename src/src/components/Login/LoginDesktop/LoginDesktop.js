import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { InputWithButton } from 'components/InputWithButton'
import { Heading, InputField, CTA } from 'goustouicomponents'
import imageGoustoApp from 'media/images/app-awareness-phone.png'
import imageRedRice from 'media/images/red-rice-pattern.png'
import css from './LoginDesktop.css'

const defaultProps = {
  showAppAwareness: false,
  initialUserPhoneNumber: null,
}
const propTypes = {
  children: PropTypes.node.isRequired,
  showAppAwareness: PropTypes.bool,
  eventErrorMessage: PropTypes.string.isRequired,
  showEventPending: PropTypes.bool.isRequired,
  showEventSent: PropTypes.bool.isRequired,
  goustoAppEventName: PropTypes.string.isRequired,
  initialUserPhoneNumber: PropTypes.string,
  sendGoustoAppLinkSMS: PropTypes.func.isRequired,
}

class LoginDesktop extends Component {
  constructor(props) {
    super(props)

    const { initialUserPhoneNumber } = this.props

    this.state = {
      userPhoneNumber: initialUserPhoneNumber,
      isPhoneNumberValid: initialUserPhoneNumber && initialUserPhoneNumber.length > 0
    }
  }

  handleInputUpdate = ({ isValid: isPhoneNumberValid, value: userPhoneNumber }) => {
    if (isPhoneNumberValid) {
      this.setState({ userPhoneNumber, isPhoneNumberValid, })
    } else {
      this.setState({ isPhoneNumberValid })
    }
  }

  handleCTAClick = () => {
    const { goustoAppEventName, sendGoustoAppLinkSMS } = this.props
    const { isPhoneNumberValid, userPhoneNumber } = this.state

    if (isPhoneNumberValid) {
      sendGoustoAppLinkSMS({
        isAnonymousUser: true,
        goustoAppEventName,
        userPhoneNumber
      })
    }
  }

  render() {
    const { userPhoneNumber } = this.state
    const {
      children,
      showAppAwareness,
      eventErrorMessage,
      showEventPending,
      showEventSent
    } = this.props
    const iconStatusStyle = classnames({
      [css.iconSuccess]: showEventSent,
    })

    return (
      <div className={classnames({[css.loginDesktopContainer]: showAppAwareness})}>
        {(showAppAwareness) && (
          <div className={css.appAwarenessContainer}>
            <div className={css.heading}>
              <Heading
                size="fontStyleL"
                type="h4"
              >
                Never miss a menu
              </Heading>
              <p className={css.subCopy}>
                Download our App to keep track of your deliveries and to be the first to know about our latest recipes!
              </p>
              <InputWithButton eventErrorMessage={eventErrorMessage} showSuccessMessage={showEventSent}>
                <div className={css.inputFieldWrapper}>
                  <span className={iconStatusStyle} />
                  <InputField
                    id="inputPhoneLogin"
                    label=""
                    phonePrefix
                    placeholder="Enter mobile number"
                    required
                    type="tel"
                    onUpdate={this.handleInputUpdate}
                    value={userPhoneNumber}
                  />
                </div>
                <CTA onClick={this.handleCTAClick} isLoading={showEventPending}>
                  Send text
                </CTA>
              </InputWithButton>
            </div>
            <div className={css.imageContainer}>
              <img className={css.ricePattern} src={imageRedRice} alt="red rice pattern" />
              <img className={css.phoneImage} src={imageGoustoApp} alt="Gousto App" />
            </div>
          </div>
        )}
        <div className={classnames({[css.loginFormContainer]: showAppAwareness})}>
          {children}
        </div>
      </div>
    )
  }
}

LoginDesktop.propTypes = propTypes
LoginDesktop.defaultProps = defaultProps

export {
  LoginDesktop
}
