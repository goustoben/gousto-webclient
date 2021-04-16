import React from 'react'
import classNames from 'classnames'
import { emailValidator } from 'utils/forms'
import { validator } from '../../utils/password'
import css from './AboutYou.css'

const passwordLabel = 'Password'
const subLabelForPassword = 'Must be at least 8 characters'
const checkboxLabel =
  'I’d like to receive the latest news and offers from Gousto, and be contacted occasionally for Customer Success purposes. I can unsubscribe at any time.'
const checkboxLabelRedesign =
  'I’d like to receive the latest news and offers from Gousto, and be contacted occasionally by our Customer Care team. I can unsubscribe anytime.'

export const fieldsConfig = ({ isCheckoutOverhaulEnabled, loginCTA, sectionName, passState }) => {
  const { isPassStrengthEnabled, isPassVisible, togglePasswordVisibility } = passState
  const emailAddressLabelNode = isCheckoutOverhaulEnabled ? loginCTA() : 'Email address'
  const labelForCheckbox = isCheckoutOverhaulEnabled ? checkboxLabelRedesign : checkboxLabel
  const emailSubLabel = !isCheckoutOverhaulEnabled
    ? 'You’ll use this to log in to your account'
    : ''
  const passwordSubLabel = isPassStrengthEnabled ? '' : subLabelForPassword
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
      inputTyp: 'Input',
      type: 'email',
      label: emailAddressLabelNode,
      subLabel: emailSubLabel,
      refId: `${sectionName}.email`,
      dataTesting: 'checkoutEmailInput',
      validate: emailValidator,
    },
    {
      name: 'password',
      inputTyp: 'Input',
      type: isPassVisible ? 'text' : 'password',
      label: passwordLabel,
      subLabel: passwordSubLabel,
      refId: `${sectionName}.password`,
      dataTesting: 'checkoutPasswordInput',
      validate: isPassStrengthEnabled && validator,
      inputSuffix: isPassStrengthEnabled && passwordSuffix,
    },
    {
      name: 'allowEmail',
      inputType: 'CheckBox',
      childLabel: labelForCheckbox,
      childLabelClassName: css.checkboxLabel,
      style: 'disclaimer',
      dataTesting: 'checkoutAllowEmailCheckbox',
    },
  ]
}
