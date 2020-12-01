import React, {
  useReducer,
  useMemo,
} from 'react'
import PropTypes from 'prop-types'
import { ToastList } from './ToastList.presentation'
import { ToastContext, toastReducer } from './Toast.context'

export const ToastProvider = ({ children }) => {
  const initialState = []

  const [state, dispatch] = useReducer(toastReducer, initialState)
  const toastContextValue = useMemo(() => ({ state, dispatch }), [state, dispatch])

  return (
    <ToastContext.Provider value={toastContextValue}>
      {children}
      <ToastList />
    </ToastContext.Provider>
  )
}

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
