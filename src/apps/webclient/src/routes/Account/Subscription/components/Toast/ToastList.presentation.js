import React, { useContext } from 'react'
import { createPortal } from 'react-dom'
import { canUseDom } from 'utils/browserHelper'
import { ToastPresentation } from './Toast.presentation'
import { ToastContext } from './Toast.context'
import css from './Toast.module.css'

const getToastContainer = () => {
  if (!canUseDom()) {
    return null
  }

  return document.getElementsByTagName('body')[0]
}

export const ToastList = () => {
  const { state } = useContext(ToastContext)

  // Current implementation only supports client side rendering
  // If SSR is detected, toast are rendered as a normal component and not in a portal
  const renderOrCreatePortal = canUseDom() ? createPortal : (tree) => tree
  const toastContainer = getToastContainer()

  return (
    renderOrCreatePortal((
      <div data-testing="toast-container" className={css.toastList}>
        {
          state.map(({
            id,
            canDismiss,
            variant,
            title,
            body,
            anchor,
            onDismiss,
            onRender,
            displayTime,
            renderAnchor
          }) => (
            <ToastPresentation
              key={id}
              id={id}
              canDismiss={canDismiss}
              variant={variant}
              title={title}
              body={body}
              anchor={anchor}
              onDismiss={onDismiss}
              onRender={onRender}
              displayTime={displayTime}
              renderAnchor={renderAnchor}
            />
          ))
        }
      </div>
    ), toastContainer)
  )
}
