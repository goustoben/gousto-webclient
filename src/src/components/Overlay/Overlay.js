import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import Modal from 'react-modal'
import css from './Overlay.css'

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
if (!__SERVER__) {
  Modal.setAppElement('#react-root')
}

// We apply styling to the document using `ReactModal__Body--open` class
// which is added to the `body` when a model is open.
const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 2001,
    overflow: 'auto',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  // This removes the default styling of `react-modal`
  content: {
    border: '',
    padding: '',
    inset: '',
    borderRadius: '',
    position: 'relative',
    background: '',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
}

const Overlay = ({
  open,
  from,
  onBackgroundClick,
  className,
  contentClassName,
  contentLabel,
  children,
}) => {
  // We don't load `react-modal` on the server cause Portals
  // are not currently supported by the server renderer.
  if (__SERVER__) return null

  const modalClassName = { base: '', afterOpen: '', beforeClose: css.beforeClose }

  return (
    <Modal
      isOpen={open}
      style={customStyles}
      contentLabel={contentLabel}
      closeTimeoutMS={200}
      preventScroll
      onRequestClose={onBackgroundClick}
      shouldCloseOnOverlayClick
      className={modalClassName}
    >
      <div className={classNames(className)}>
        <div
          className={open ? css.animation : css.fadeOutAnimation}
          onClick={open ? onBackgroundClick : () => {}}
          onKeyPress={open ? onBackgroundClick : () => {}}
          role="button"
          tabIndex={0}
        >
          &nbsp;
        </div>
        <div
          className={classNames(contentClassName, css[`contentFrom${from}`], css.overlayContent)}
        >
          {children || <span />}
        </div>
      </div>
    </Modal>
  )
}

Overlay.propTypes = {
  open: PropTypes.bool.isRequired,
  className: PropTypes.string,
  contentClassName: PropTypes.string,
  from: PropTypes.string,
  onBackgroundClick: PropTypes.func,
  contentLabel: PropTypes.string,
  children: PropTypes.node,
}

Overlay.defaultProps = {
  contentLabel: 'Modal',
  from: 'right',
  contentClassName: '',
  className: '',
  onBackgroundClick: null,
  children: null,
}

export default Overlay
