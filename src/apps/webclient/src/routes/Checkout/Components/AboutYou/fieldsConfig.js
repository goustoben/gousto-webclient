import React from 'react'
import { client } from 'config/routes'
import { emailValidator } from 'utils/forms'
import { Icon, IconVariant, Box, Color, Text, Link } from '@gousto-internal/citrus-react'
import css from './AboutYou.css'

const passwordLabel = 'Password'
const checkboxLabel = (trackPrivacyPolicyClick) => (
  <Text size={1}>
    I’d like to receive news and offers from Gousto in line with the{' '}
    <Link
      size={1}
      href={client.privacyPolicy}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackPrivacyPolicyClick}
    >
      Privacy Policy
    </Link>
    . I can unsubscribe anytime.
  </Text>
)

export const fieldsConfig = ({ loginCTA, sectionName, passState, trackPrivacyPolicyClick }) => {
  const { isPassVisible, togglePasswordVisibility } = passState
  const passwordSuffix = (
    <Box color={Color.ColdGrey_400}>
      <Icon
        name={isPassVisible ? 'hide' : 'show'}
        variant={IconVariant.Inherit}
        role="button"
        onClick={togglePasswordVisibility}
        onKeyPress={togglePasswordVisibility}
        style={{ display: 'block' }}
      >
        {isPassVisible ? 'hide password' : 'show password'}
      </Icon>
    </Box>
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
