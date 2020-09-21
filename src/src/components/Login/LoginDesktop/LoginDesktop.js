import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { InputWithButton } from 'components/InputWithButton'
import { Heading, InputField, CTA } from 'goustouicomponents'
import imageGoustoApp from 'media/images/app-awareness-phone.png'
import imageRedRice from 'media/images/red-rice-pattern.png'
import css from './LoginDesktop.css'

const defaultProps = {
  showAppAwareness: false,
}
const propTypes = {
  children: PropTypes.node.isRequired,
  showAppAwareness: PropTypes.bool,
}

const LoginDesktop = ({ children, showAppAwareness }) => (
  <div className={classNames({[css.loginDesktopContainer]: showAppAwareness})}>
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
          <InputWithButton>
            <InputField
              id="inputPhoneLogin"
              phonePrefix
              placeholder="Enter mobile number"
              required
              type="tel"
              onUpdate={() => {}}
            />
            <CTA onClick={() => {}}>
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
    <div className={classNames({[css.loginFormContainer]: showAppAwareness})}>
      {children}
    </div>
  </div>
)

LoginDesktop.propTypes = propTypes
LoginDesktop.defaultProps = defaultProps

export {
  LoginDesktop
}
