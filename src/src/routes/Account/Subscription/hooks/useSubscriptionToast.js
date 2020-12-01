import { useContext } from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'

import { ToastContext, toastActions } from '../components/Toast'
import { getSubscriptionToastContent } from '../utils/toast'

export const useSubscriptionToast = (updateResponse, updateError) => {
  const { dispatch } = useContext(ToastContext)

  useDeepCompareEffect(() => {
    if (updateResponse || updateError) {
      dispatch({
        type: toastActions.ADD_TOAST,
        payload: getSubscriptionToastContent(updateResponse)
      })
    }
  }, [(updateResponse || {}), (updateError || {}), dispatch])
}
