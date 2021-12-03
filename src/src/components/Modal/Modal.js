import PropTypes from 'prop-types'
import React from 'react'
import { Portal } from 'react-portal'
import css from './Modal.module.css'

const GoustoModal = (props) => {
  const { children, isOpen } = props

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
  isOpen: PropTypes.bool.isRequired
}

export default GoustoModal
