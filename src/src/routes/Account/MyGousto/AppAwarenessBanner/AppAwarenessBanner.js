import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { InputWithButton } from 'components/InputWithButton'
import { CTA, Heading, InputField } from 'goustouicomponents'
import imageGoustoApp from 'media/images/app-awareness-phone.png'
import css from './AppAwarenessBanner.module.css'

const defaultProps = {
  initialUserPhoneNumber: null,
}

const propTypes = {
  eventErrorMessage: PropTypes.string.isRequired,
  showEventPending: PropTypes.bool.isRequired,
  showEventSent: PropTypes.bool.isRequired,
  goustoAppEventName: PropTypes.string.isRequired,
  initialUserPhoneNumber: PropTypes.string,
  sendGoustoAppLinkSMS: PropTypes.func.isRequired,
}

class AppAwarenessBanner extends Component {
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
        isAnonymousUser: false,
        goustoAppEventName,
        userPhoneNumber
      })
    }
  }

  render() {
    const { userPhoneNumber } = this.state
    const { eventErrorMessage, showEventPending, showEventSent } = this.props
    const iconStatusStyle = classnames({
      [css.iconSuccess]: showEventSent,
    })

    return (
      <div className={css.wrapper}>
        <div>
          <img className={css.imageGoustoApp} src={imageGoustoApp} alt="Gousto App" />
        </div>
        <div className={css.textContentWrapper}>
          <Heading
            size="fontStyleXL"
            type="h3"
          >
            Gousto from your pocket
          </Heading>
          <p className={css.copy}>
            Download our App to keep track of your deliveries and be the first to know about the latest recipes
          </p>
          <InputWithButton eventErrorMessage={eventErrorMessage} showSuccessMessage={showEventSent}>
            <div className={css.inputFieldWrapper}>
              <span className={iconStatusStyle} />
              <InputField
                id="inputAppAwarenessBanner"
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
      </div>
    )
  }
}

AppAwarenessBanner.defaultProps = defaultProps
AppAwarenessBanner.propTypes = propTypes

export {
  AppAwarenessBanner
}
