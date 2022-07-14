import React, { forwardRef } from 'react'

import GoogleReCAPTCHA, { ReCAPTCHAProps } from 'react-google-recaptcha'

import { getRecaptchaPublicKey } from 'utils/isomorphicEnvironment'

type RecaptchaProps = Omit<ReCAPTCHAProps, 'sitekey'> & Partial<Pick<ReCAPTCHAProps, 'sitekey'>>

export const Recaptcha = forwardRef<GoogleReCAPTCHA, RecaptchaProps>(
  (props: RecaptchaProps, ref) => {
    const { sitekey = getRecaptchaPublicKey(), size = 'invisible' } = props

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <GoogleReCAPTCHA ref={ref} {...props} sitekey={sitekey} size={size} />
  },
)

Recaptcha.displayName = 'Recaptcha'
