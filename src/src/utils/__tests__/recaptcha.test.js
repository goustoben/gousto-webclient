import { isSecretPingdomEmail } from '../recaptcha'

describe('recaptcha', () => {
  describe('isSecretPingdomEmail', () => {
    test('pingdom e-mail is hashed', () => {
      const pingdomEmail = 'shaun.pearce+codetest@gmail.com'

      expect(isSecretPingdomEmail(pingdomEmail)).toBe(true)
    })

    test('normal user e-mails is not hashed', () => {
      const email = 'gousto-customer-12345@gmail.com'

      expect(isSecretPingdomEmail(email)).toBe(false)
    })
  })
})
