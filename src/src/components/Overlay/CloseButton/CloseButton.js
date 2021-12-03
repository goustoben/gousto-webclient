import PropTypes from 'prop-types'
import React from 'react'
import { onEnter } from 'utils/accessibility'
import css from './CloseButton.module.css'

const CloseButton = ({ onClose }) => (
  <span
    className={css.closeIcon}
    onClick={onClose}
    role="button"
    tabIndex={0}
    onKeyPress={onEnter(onClose)}
  />
)

CloseButton.propTypes = {
  onClose: PropTypes.func.isRequired,
}

export default CloseButton
