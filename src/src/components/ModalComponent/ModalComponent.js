import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

import Overlay from 'Overlay'
import css from './ModalComponent.css'

const ModalComponent = ({ children, visible, styleName, from }) => (
  <Overlay open={Boolean(visible)} from={from}>
    <div className={(styleName && classnames(css.modalComponent, styleName)) || css.modalComponent}>{children}</div>
  </Overlay>
)

ModalComponent.propTypes = {
  children: PropTypes.node,
  visible: PropTypes.bool,
  styleName: PropTypes.string,
  from: PropTypes.string,
}

ModalComponent.defaultProps = {
  children: null,
  visible: false,
  styleName: null,
  from: 'top',
}

export default ModalComponent
