import { v4 } from 'uuid'

export const getSubscriptionToastContent = (isSuccess) => {
  const toastId = v4()

  const basePayload = {
    id: toastId,
    canDismiss: false,
    displayTime: 'long'
  }

  const errorPayload = {
    ...basePayload,
    title: 'Oops, something went wrong',
    body: 'Sorry, we couldn’t process your request right now. Please try again.',
    variant: 'error',
  }

  const successPayload = {
    ...basePayload,
    title: 'Updated successfully',
    body: 'Your subscription details have been successfully updated',
    variant: 'success',
  }

  return isSuccess ? successPayload : errorPayload
}
