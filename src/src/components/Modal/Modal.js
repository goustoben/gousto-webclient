import PropTypes from 'prop-types'
import React from 'react'
import Portal from 'react-portal'
import ModalPanel from './ModalPanel'

const GoustoModal = (props) => {
  const { children, isOpened } = props

  return (
    <Portal {...props}>
      <ModalPanel>
        {React.cloneElement(children, { isOpen: isOpened })}
      </ModalPanel>
    </Portal>
  )
}

GoustoModal.propTypes = {
  children: PropTypes.node.isRequired,
  openByClickOn: PropTypes.node,
  closeOnEsc: PropTypes.bool,
  closeOnOutsideClick: PropTypes.bool,
  onOpen: PropTypes.func,
  beforeClose: PropTypes.func,
  isOpened: PropTypes.bool,
  onClose: PropTypes.func,
  onUpdate: PropTypes.func,
}

GoustoModal.defaultProps = {
  closeOnEsc: true,
  closeOnOutsideClick: true,
  isOpened: false,
  onOpen: () => {},
  onClose: () => {},
  onUpdate: () => {},
}

export default GoustoModal
