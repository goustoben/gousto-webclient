import { triggerLoggingManagerEvent } from 'apis/loggingManager'

export const trackUserFreeFoodPageView = () => (
  async (dispatch, getState) => {
    const { auth, request } = getState()
    const authUserId = auth.get('id')
    const device = request.get('browser')
    const eventName = 'rafPage-visited'
    const accessToken = auth.get('client').get('accessToken')

    const loggingManagerEvent = {
      accessToken,
      body: {
        eventName,
        data: {
          auth_user_id: authUserId,
          event: eventName,
          device,
        }
      },
    }

    triggerLoggingManagerEvent(loggingManagerEvent)
  }
)
