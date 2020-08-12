import { logEventToServer } from 'apis/loggingManager'

export const trackUserFreeFoodPageView = () => (
  async (dispatch, getState) => {
    const { auth, request } = getState()
    const authUserId = auth.get('id')
    const device = request.get('browser')
    const eventName = 'rafPage-visited'

    const loggingManagerEvent = {
      eventName,
      authUserId,
      data: {
        device,
      },
    }

    logEventToServer(loggingManagerEvent)
  }
)
