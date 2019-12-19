import PropTypes from 'prop-types'
import React from 'react'

import { ModalFooter } from 'ModalComponent'
import { onEnter } from 'utils/accessibility'

import css from './Footer.css'

const propTypes = {
  onConfirm: PropTypes.func.isRequired,
  confirmCopy: PropTypes.string.isRequired,
  onKeep: PropTypes.func.isRequired,
  keepCopy: PropTypes.string.isRequired,
}

const Footer = ({ onConfirm, confirmCopy, onKeep, keepCopy }) => (
  <ModalFooter>
    <div
      className={css.confirm}
      role="button"
      tabIndex={0}
      onClick={() => onConfirm()}
      onKeyDown={event => onEnter(event, onConfirm())}
    >
      {confirmCopy}
    </div>
    <button
      className={css.keep}
      type="button"
      onClick={() => onKeep()}
      onKeyDown={event => onEnter(event, onKeep())}
    >
      {keepCopy}
    </button>
  </ModalFooter>
)

Footer.propTypes = propTypes

export { Footer }
