import React, { Fragment, createRef } from 'react'
import PropTypes from 'prop-types'
import { Transition } from 'react-transition-group'
import classnames from 'classnames'

import css from './Modal.module.css'
import { MODAL_VARIANTS, ANIMATION_DURATION } from './variants'
import { ModalOverlay } from './ModalOverlay'

const noOp = () => { }

class Modal extends React.Component {
  constructor() {
    super()

    this.modalRef = createRef()
  }

  handleClickOutside = (e) => {
    const { handleClose } = this.props
    if (this.modalRef.current && !this.modalRef.current.contains(e.target)) {
      handleClose(e)
    }
  }

  componentDidMount = () => {
    const { isOpen } = this.props
    this.syncEventListener(isOpen)
  }

  componentDidUpdate = (prevProps) => {
    const { isOpen, onRequestClose } = this.props

    if (isOpen !== prevProps.isOpen) {
      this.syncEventListener(isOpen)

      if (!isOpen) {
        onRequestClose()
      }
    }
  }

  componentWillUnmount = () => {
    this.syncEventListener(false)
  }

  syncEventListener = (add) => {
    if (add) {
      document.addEventListener('mousedown', this.handleClickOutside)
    } else {
      document.removeEventListener('mousedown', this.handleClickOutside)
    }
  }

  render = () => {
    const {
      name,
      description,
      hideCloseIcon,
      children,
      isOpen,
      handleClose,
      animated,
      variant,
      withOverlay,
    } = this.props

    const { defaultStyle, transitionStyles } = MODAL_VARIANTS[variant].animation
    const { classNames: variantClassnames } = MODAL_VARIANTS[variant]

    return (
      <Transition
        in={isOpen}
        onEnter={(node) => node.offsetHeight}
        mountOnEnter
        unmountOnExit
        timeout={ANIMATION_DURATION}
        enter={animated}
        exit={animated}
      >
        {(transitionState) => (
          // eslint-disable-next-line
          <Fragment>
            <ModalOverlay isOpen={isOpen} useOverlay={withOverlay} />
            <div
              ref={this.modalRef}
              role="dialog"
              aria-labelledby={name}
              aria-describedby={description}
              data-testing={`${name}-modal`}
              className={classnames(css.modalContainerRoot, css[variantClassnames.container])}
              style={{ ...defaultStyle, ...transitionStyles[transitionState] }}
            >
              {!hideCloseIcon && (
                <button
                  data-testing="modal-close-button"
                  type="button"
                  onClick={handleClose}
                  className={css.modalCloseButton}
                >
                  <span role="img" aria-label="Close Icon" className={css.modalCloseIcon} />
                </button>
              )}
              {children}
            </div>
          </Fragment>
        )}
      </Transition>
    )
  };
}

Modal.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  hideCloseIcon: PropTypes.bool,
  handleClose: PropTypes.func,
  onRequestClose: PropTypes.func,
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  animated: PropTypes.bool,
  variant: PropTypes.oneOf(Object.keys(MODAL_VARIANTS)),
  withOverlay: PropTypes.bool,
}

Modal.defaultProps = {
  onRequestClose: noOp,
  handleClose: noOp,
  hideCloseIcon: false,
  animated: true,
  variant: 'fullScreen',
  withOverlay: false,
}

export { Modal }
