import React from 'react'
import classNames from 'classnames'
import { client } from 'config/routes'
import { emailValidator } from 'utils/forms'
import css from './AboutYou.css'

const passwordLabel = 'Password'
const checkboxLabel = (trackPrivacyPolicyClick) => (
  <span>
    I’d like to receive news and offers from Gousto in line with the&nbsp;
    <a
      href={client.privacyPolicy}
      className={css.privacyPolicyLink}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackPrivacyPolicyClick}
    >
      Privacy Policy
    </a>
    . I can unsubscribe anytime.
  </span>
)

export const fieldsConfig = ({ loginCTA, sectionName, passState, trackPrivacyPolicyClick }) => {
  const { isPassVisible, togglePasswordVisibility } = passState
  const passwordSuffix = (
    <span
      role="button"
      tabIndex={0}
      className={classNames(css.eyeIcon, {
        [css.showPassword]: !isPassVisible,
        [css.hidePassword]: isPassVisible,
      })}
      onClick={togglePasswordVisibility}
      onKeyPress={togglePasswordVisibility}
    />
  )

  return [
    {
      name: 'email',
      inputType: 'Input',
      type: 'email',
      label: loginCTA(),
      subLabel: '',
      refId: `${sectionName}.email`,
      dataTesting: 'checkoutEmailInput',
      validate: emailValidator,
      autoComplete: 'username',
    },
    {
      name: 'password',
      type: isPassVisible ? 'text' : 'password',
      label: passwordLabel,
      dataTesting: 'checkoutPasswordInput',
      inputSuffix: passwordSuffix,
    },
    {
      name: 'allowEmail',
      inputType: 'CheckBox',
      childLabel: checkboxLabel(trackPrivacyPolicyClick),
      childLabelClassName: css.checkboxLabel,
      style: 'disclaimer',
      dataTesting: 'checkoutAllowEmailCheckbox',
    },
  ]
}
