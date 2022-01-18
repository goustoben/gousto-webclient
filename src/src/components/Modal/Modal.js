import PropTypes from 'prop-types'
import React from 'react'
import { Portal } from 'react-portal'
import { useBrowserBack } from '../../hooks/useBrowserBack'
import css from './Modal.css'

const GoustoModal = (props) => {
  const { children, isOpen, onBackCallback } = props
  useBrowserBack(onBackCallback)

  return (
    <Portal isOpen={isOpen}>
      <div className={css.modalContainer}>
        {children}
      </div>
    </Portal>
  )
}

GoustoModal.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onBackCallback: PropTypes.func,
}

GoustoModal.defaultProps = {
  onBackCallback: null,
}

export default GoustoModal
