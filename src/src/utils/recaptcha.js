const secretPingdomEmailLength = 31
const secretPingdomEmailSuffix = '@gmail.com'
const secretPingdomEmailQuickHash = 294722922

// from StackOverflow [user: lordvlad] https://stackoverflow.com/a/15710692/1916362
// so we disable eslint
const quickStringHash = string => (
  // eslint-disable-next-line
  string.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0)
)

export const isSecretPingdomEmail = (email) => (
  email
  && email.length === secretPingdomEmailLength
  && email.endsWith(secretPingdomEmailSuffix)
  && quickStringHash(email) === secretPingdomEmailQuickHash
)
