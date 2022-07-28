import React, { forwardRef, useEffect, useState } from 'react'

import GoogleReCAPTCHA, { ReCAPTCHAProps } from 'react-google-recaptcha'

import { fetchFeatures } from 'apis/fetchS3'
import { getRecaptchaPublicKey } from 'utils/isomorphicEnvironment'
import logger from 'utils/logger'

type RecaptchaProps = Omit<ReCAPTCHAProps, 'sitekey'> & Partial<Pick<ReCAPTCHAProps, 'sitekey'>>

/**
 * To use the explicit version, see the documentation https://www.npmjs.com/package/react-google-recaptcha.
 * By default, reCAPTCHA is in invisible mode. For it to work it is necessary to provide two props:
 * @property {GoogleReCAPTCHA} ref - reference to grecaptcha object that is exposed by reCAPTCHA API,
 *                                   call its execute() method to invoke the verification
 * @property {(token: string | null) => void} onChange - callback that will be called with token when verification
 *                                                       completes, also called with null when captcha expires
 */
export const Recaptcha = forwardRef<GoogleReCAPTCHA, RecaptchaProps>(
  (props: RecaptchaProps, ref) => {
    const [isEnabled, setIsEnabled] = useState(false)

    useEffect(() => {
      async function getIsEnabled() {
        try {
          const { data } = await fetchFeatures()
          if (data) {
            const { isRecaptchaEnabled } = data
            setIsEnabled(isRecaptchaEnabled)
          }
        } catch (err) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          logger.error({ message: `S3File fetch failed: ${JSON.stringify(err)}` })
        }
      }

      getIsEnabled()
    }, [])

    if (!isEnabled) return null

    const { sitekey = getRecaptchaPublicKey(), size = 'invisible' } = props

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <GoogleReCAPTCHA ref={ref} {...props} sitekey={sitekey} size={size} />
  },
)

Recaptcha.displayName = 'Recaptcha'
