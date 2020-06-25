export const WEB = 'web'
export const MOBILE = 'mobile'

export const withPlatformTags = (...tags) => {
  const envPlatform = Cypress.env('platform') || ''
  const platformTags = envPlatform.split(/[,]+/)

  const filteredTags = tags.filter(tag => platformTags.includes(tag))
  if(filteredTags.length === 0) {
    return { it: window.it.skip, describe: window.describe.skip };
  }

  return { it: window.it, describe: window.describe };
}
