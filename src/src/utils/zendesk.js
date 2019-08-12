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
    zeInstance(() => {
      zeInstance('webWidget', 'open')

      window.$zopim(() => {
        /*
        * When users click on the minimize button within the chat,
        * it hides the chat button completely from the page . This would force the button to be shown.
        */
        window.$zopim.livechat.window.onHide(() => {
          zeInstance('webWidget', 'open')
        })
      })
    })
  } else {
    zeInstance(() => {
      zeInstance('webWidget', 'hide')
    })
  }
}
