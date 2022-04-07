import { getEnvironment } from 'utils/isomorphicEnvironment'

const GOUSTO_PRODUCTION_RECAPTCHA_PUBLIC_KEY = '6LcjBd8UAAAAAHrzA39Dqsvilk4wdYoY3oKq1irO'
const GOOGLE_RECAPTCHA_TEST_PUBLIC_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'

export const RECAPTCHA_PUBLIC_KEY = (
  getEnvironment() === 'production'
  ? GOUSTO_PRODUCTION_RECAPTCHA_PUBLIC_KEY
  : GOOGLE_RECAPTCHA_TEST_PUBLIC_KEY
)
