import PropTypes from 'prop-types'
import React from 'react'

import { ModalFooter } from 'ModalComponent'

import css from './Footer.css'

const propTypes = {
  onLoss: PropTypes.func.isRequired,
  onLossCopy: PropTypes.string.isRequired,
  onRecover: PropTypes.func.isRequired,
  onRecoverCopy: PropTypes.string.isRequired,
}

const Footer = ({ onLoss, onLossCopy, onRecover, onRecoverCopy }) => {

  return (
    <ModalFooter>
      <div
        className={css.loss}
        role="button"
        tabIndex={0}
        onClick={() => onLoss()}
        onKeyDown={event => event.keyCode === 13 && onLoss()}
      >
        {onLossCopy}
      </div>
      <button
        className={css.recover}
        type="button"
        onClick={() => onRecover()}
        onKeyDown={event => event.keyCode === 13 && onRecover()}
      >
        {onRecoverCopy}
      </button>
    </ModalFooter>
  )
}

Footer.propTypes = propTypes

export { Footer }
