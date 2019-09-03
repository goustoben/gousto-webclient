const enabledPages = [
  '/my-gousto',
  '/my-deliveries',
  '/my-details',
  '/my-subscription',
  '/my-referrals',
  '/rate-my-recipes',
  '/help',
  '/cookbook',
]
const notFoundErrorMessage = 'Could not find `zE` function'
let zeInstance = null

window.zESettings = {
  webWidget: {
    color: {
      launcherText: '#FFFFFF'
    }
  }
}

export const zeStart = () => {
  const RETRY_WAIT = 1000
  const MAX_ATTEMPTS_NUMBER = 3

  let interval = null
  let currentAttemptNumber = 0

  return new Promise((resolve, reject) => {
    const findZendeskInstance = () => {
      if (window.zE) {
        zeInstance = window.zE

        resolve()
      }

      if (currentAttemptNumber > MAX_ATTEMPTS_NUMBER) {
        clearInterval(interval)

        reject(
          new Error(notFoundErrorMessage)
        )
      }

      currentAttemptNumber++
    }

    interval = setInterval(findZendeskInstance, RETRY_WAIT)
  })
}

export const zeChatButtonSetUp = (pathName) => {
  const shouldDisplayChat = enabledPages.indexOf(pathName) > -1

  if (!zeInstance) {
    throw new Error(notFoundErrorMessage)
  }

  if (shouldDisplayChat) {
    zeInstance('webWidget', 'show')
  } else {
    zeInstance('webWidget', 'hide')
  }
}
