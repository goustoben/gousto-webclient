import PropTypes from 'prop-types'
import React from 'react'
import ModalHeader from 'Modal/ModalHeader'
import css from './ModalScreen.css'

const ModalScreen = ({ children, title }) => (
  <div className={css.flex}>
    {title && <ModalHeader>{title}</ModalHeader>}
    {children}
  </div>
)

ModalScreen.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
}

ModalScreen.defaultProps = {
  title: null,
}

export default ModalScreen
