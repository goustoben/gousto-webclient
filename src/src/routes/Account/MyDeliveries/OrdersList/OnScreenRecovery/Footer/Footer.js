import PropTypes from 'prop-types'
import React from 'react'

import { ModalFooter } from 'ModalComponent'

import css from './Footer.css'

const propTypes = {
  onConfirm: PropTypes.func.isRequired,
  confirmCopy: PropTypes.string.isRequired,
  onKeep: PropTypes.func.isRequired,
  keepCopy: PropTypes.string.isRequired,
}

const Footer = ({ onConfirm, confirmCopy, onKeep, keepCopy }) => {

  return (
    <ModalFooter>
      <div
        className={css.loss}
        role="button"
        tabIndex={0}
        onClick={() => onConfirm()}
        onKeyDown={event => event.keyCode === 13 && onConfirm()}
      >
        {confirmCopy}
      </div>
      <button
        className={css.recover}
        type="button"
        onClick={() => onKeep()}
        onKeyDown={event => event.keyCode === 13 && onKeep()}
      >
        {keepCopy}
      </button>
    </ModalFooter>
  )
}

Footer.propTypes = propTypes

export { Footer }
