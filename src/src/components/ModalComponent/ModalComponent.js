import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

import Overlay from 'Overlay'
import css from './ModalComponent.css'

const ModalComponent = ({ children, visible, styleName }) => (
	<Overlay open={Boolean(visible)} from="top">
		<div className={(styleName && classnames(css.modalComponent, styleName)) || css.modalComponent}>{children}</div>
	</Overlay>
)

ModalComponent.propTypes = {
  children: PropTypes.node,
  visible: PropTypes.bool,
  className: PropTypes.string,
}

export default ModalComponent
