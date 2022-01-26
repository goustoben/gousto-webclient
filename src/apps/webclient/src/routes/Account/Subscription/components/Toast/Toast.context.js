import { createContext } from 'react'

export const toastActions = {
  ADD_TOAST: 'ADD_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
  REMOVE_ALL_TOASTS: 'REMOVE_ALL_TOASTS',
}

export const ToastContext = createContext(null)
ToastContext.displayName = 'ToastContext'

export const toastReducer = (state, action) => {
  switch (action.type) {
  case toastActions.ADD_TOAST:
    return [action.payload, ...state]
  case toastActions.REMOVE_TOAST:
    return state.filter((toast) => toast.id !== action.id)
  case toastActions.REMOVE_ALL_TOASTS:
    return []
  default:
    return state
  }
}
