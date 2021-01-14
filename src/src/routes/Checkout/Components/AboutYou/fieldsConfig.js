import React from 'react'
import { emailValidator } from 'utils/forms'
import css from './AboutYou.css'

const passwordLabel = 'Password'
const subLabelForPassword = 'Must be at least 8 characters'
const checkboxLabel = 'I’d like to receive the latest news and offers from Gousto, and be contacted occasionally for Customer Success purposes. I can unsubscribe at any time.'
const checkboxLabelRedesign = 'I’d like to receive the latest news and offers from Gousto, and be contacted occasionally by our Customer Care team. I can unsubscribe anytime.'

export const fieldsConfig = ({ isCheckoutOverhaulEnabled, loginCTA, sectionName }) => {
  const emailAddressLabelNode = isCheckoutOverhaulEnabled ? loginCTA() : 'Email address'
  const passwordSubLabel = isCheckoutOverhaulEnabled ? <span className={css.fieldSubLabel}>{subLabelForPassword}</span> : subLabelForPassword
  const labelForCheckbox = isCheckoutOverhaulEnabled ? checkboxLabelRedesign : checkboxLabel
  const inputClassName = isCheckoutOverhaulEnabled ? css.input : ''
  const emailSubLabel = !isCheckoutOverhaulEnabled ? 'You’ll use this to log in to your account' : ''

  return [
    {
      name: 'email',
      inputTyp: 'Input',
      type: 'email',
      label: emailAddressLabelNode,
      subLabel: emailSubLabel,
      className: inputClassName,
      refId: `${sectionName}.email`,
      dataTesting: 'checkoutEmailInput',
      validate: emailValidator,
    },
    {
      name: 'password',
      inputTyp: 'Input',
      type: 'password',
      label: isCheckoutOverhaulEnabled ? <span className={css.fieldLabel}>{passwordLabel}</span> : passwordLabel,
      subLabel: passwordSubLabel,
      className: inputClassName,
      refId: `${sectionName}.password`,
      dataTesting: 'checkoutPasswordInput',
    },
    {
      name: 'allowEmail',
      inputType: 'CheckBox',
      childLabel: labelForCheckbox,
      childLabelClassName: css.checkboxLabel,
      style: 'disclaimer',
      dataTesting: 'checkoutAllowEmailCheckbox',
    }
  ]
}
