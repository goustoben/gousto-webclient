import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

import Overlay from 'Overlay'
import css from './ModalComponent.css'

const ModalComponent = ({ children, visible, styleName, overlayContentClassName, from, onClose }) => (
  <Overlay open={Boolean(visible)} contentClassName={overlayContentClassName} from={from} onBackgroundClick={onClose}>
    <div className={(styleName && classnames(css.modalComponent, styleName)) || css.modalComponent}>{children}</div>
  </Overlay>
)

ModalComponent.propTypes = {
  children: PropTypes.node,
  visible: PropTypes.bool,
  styleName: PropTypes.string,
  from: PropTypes.string,
  onClose: PropTypes.func,
  overlayContentClassName: PropTypes.string,
}

ModalComponent.defaultProps = {
  children: null,
  visible: false,
  styleName: null,
  from: 'top',
  onClose: null,
  overlayContentClassName: '',
}

export default ModalComponent
