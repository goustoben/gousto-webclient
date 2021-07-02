import React from 'react'
import classNames from 'classnames'
import { emailValidator } from 'utils/forms'
import css from './AboutYou.css'

const passwordLabel = 'Password'
const checkboxLabel =
  'I’d like to receive the latest news and offers from Gousto, and be contacted occasionally by our Customer Care team. I can unsubscribe anytime.'

export const fieldsConfig = ({ loginCTA, sectionName, passState }) => {
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
      childLabel: checkboxLabel,
      childLabelClassName: css.checkboxLabel,
      style: 'disclaimer',
      dataTesting: 'checkoutAllowEmailCheckbox',
    },
  ]
}
