import React, { useEffect, useContext, useCallback } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import css from './Toast.module.css'
import { ToastContext, toastActions } from './Toast.context'

const DISPLAY_TIMES = {
  short: 4000,
  long: 8000,
}

export const ToastPresentation = ({
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
}) => {
  const { dispatch } = useContext(ToastContext)

  const handleOnDismiss = useCallback(() => {
    if (onDismiss) {
      onDismiss({ id })
    }

    dispatch({ type: toastActions.REMOVE_TOAST, id })
  }, [dispatch, id, onDismiss])

  useEffect(() => {
    if (onRender) {
      onRender({ id })
    }

    setTimeout(() => {
      handleOnDismiss()
    }, DISPLAY_TIMES[displayTime])
  }, [onRender, handleOnDismiss, displayTime, id])

  return (
    <div className={classNames(css.toast, css[variant])}>
      <div className={css.toastContentContainer}>
        <div className={classNames(css.icon, css[`${variant}Icon`])} />
        <div className={css.content}>
          <p data-testing="toast-title" className={css.title}>{title}</p>
          {body
            ? (
              <p
                data-testing="toast-body"
                className={css.body}
              >
                {body}
              </p>
            ) : null}
          {anchor
            ? (
              <a
                data-testing="toast-anchor"
                href={anchor.href}
                className={css.anchor}
              >
                {anchor.text}
              </a>
            ) : null}
          {renderAnchor ? renderAnchor() : null}
        </div>
      </div>
      {canDismiss
        ? (
          <button
            data-testing="toast-dismiss-btn"
            type="button"
            onClick={handleOnDismiss}
            className={css.dismissIcon}
          />
        ) : null}
    </div>
  )
}

ToastPresentation.propTypes = {
  id: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['error', 'success', 'warning']),
  onDismiss: PropTypes.func,
  onRender: PropTypes.func,
  displayTime: PropTypes.oneOf(['short', 'long']),
  title: PropTypes.string.isRequired,
  body: PropTypes.string,
  anchor: PropTypes.shape({ text: PropTypes.string, href: PropTypes.string }),
  canDismiss: PropTypes.bool,
  renderAnchor: PropTypes.func
}

ToastPresentation.defaultProps = {
  variant: 'success',
  onDismiss: () => null,
  onRender: null,
  displayTime: 'short',
  body: null,
  anchor: null,
  canDismiss: true,
  renderAnchor: null
}
