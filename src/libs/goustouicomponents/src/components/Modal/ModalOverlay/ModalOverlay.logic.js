import React from 'react'
import PropTypes from 'prop-types'
import { Transition } from 'react-transition-group'

import css from './ModalOverlay.module.css'

const ANIMATION_DURATION = 700

const defaultStyle = {
  opacity: 0,
  transitionProperty: 'opacity',
}

const transitionStyles = {
  entering: { opacity: 0.7, transitionDuration: `${ANIMATION_DURATION}ms` },
  entered: { opacity: 0.7, transitionDuration: `${ANIMATION_DURATION}ms` },
  exiting: { opacity: 0, transitionDuration: `${ANIMATION_DURATION}ms` },
  exited: { opacity: 0, transitionDuration: `${ANIMATION_DURATION}ms` },
}

export const ModalOverlay = ({
  useOverlay,
  isOpen,
}) => (useOverlay
  ? (
    <Transition
      in={isOpen}
      appear
      unmountOnExit
      onEnter={(node) => node.offsetHeight}
      timeout={ANIMATION_DURATION}
    >
      {(transitionState) => (
        <div
          data-testing="modal-overlay"
          style={{ ...defaultStyle, ...transitionStyles[transitionState] }}
          className={css.overlay}
        />
      )}

    </Transition>
  )
  : null)

ModalOverlay.propTypes = {
  useOverlay: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
}

ModalOverlay.defaultProps = {
  useOverlay: false,
}
