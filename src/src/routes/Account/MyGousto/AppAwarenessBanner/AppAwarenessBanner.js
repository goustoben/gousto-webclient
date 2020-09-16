import React from 'react'
import PropTypes from 'prop-types'
import { InputWithButton } from 'components/InputWithButton'
import { CTA, Heading, InputField } from 'goustouicomponents'
import imageGoustoApp from 'media/images/app-awareness-phone.png'
import css from './AppAwarenessBanner.css'

const defaultProps = {
  userPhoneNumber: null,
  sendText: () => {}
}

const propTypes = {
  userPhoneNumber: PropTypes.string,
  sendText: PropTypes.func,
}

const AppAwarenessBanner = ({ userPhoneNumber, sendText }) => (
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
      <InputWithButton>
        <InputField
          id="inputAppAwarenessBanner"
          label=""
          phonePrefix
          placeholder="Enter mobile number"
          required
          type="tel"
          onUpdate={() => {}}
          value={userPhoneNumber}
        />
        <CTA onClick={sendText}>
          Send text
        </CTA>
      </InputWithButton>
    </div>
  </div>
)

AppAwarenessBanner.defaultProps = defaultProps
AppAwarenessBanner.propTypes = propTypes

export {
  AppAwarenessBanner
}
