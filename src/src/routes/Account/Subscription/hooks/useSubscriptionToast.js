import { useContext, useEffect } from 'react'
import { ToastContext, toastActions } from '../components/Toast'
import { getSubscriptionToastContent } from '../utils/toast'

export const useSubscriptionToast = (updateResponse, updateError) => {
  const { dispatch } = useContext(ToastContext)

  const responseString = JSON.stringify(updateResponse)

  useEffect(() => {
    if (responseString || updateError) {
      dispatch({
        type: toastActions.ADD_TOAST,
        payload: getSubscriptionToastContent(responseString)
      })
    }
  }, [responseString, updateError, dispatch])
}
