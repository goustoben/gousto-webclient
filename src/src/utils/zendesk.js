const zendesk = (pathName) => {
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

  const shouldDisplayChat = enabledPages.indexOf(pathName) > -1

  return {
    getZopim: (callback) => {
      let zendeskCallAttempts = 0
      let interval = null

      const findZopimInstance = () => {
        if (window.$zopim) {
          callback()
        }

        if (zendeskCallAttempts > 3 || window.$zopim) {
          clearInterval(interval)
        }

        zendeskCallAttempts++
      }

      interval = setInterval(findZopimInstance, 1000)
    },
    chatButton: () => {
      // https://support.zendesk.com/hc/en-us/articles/203661356
      if (shouldDisplayChat) {
        window.$zopim(() => {
          window.$zopim.livechat.button.show()

          window.$zopim.livechat.window.onHide(() => {
            window.$zopim.livechat.button.show()
          })
        })
      } else {
        window.$zopim(() => (window.$zopim.livechat.hideAll()))
      }
    },
  }
}

export default zendesk

