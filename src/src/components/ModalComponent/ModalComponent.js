import React, { PropTypes } from 'react'
import classnames from 'classnames'

import css from './ModalComponent.css'
import Overlay from 'Overlay'

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
