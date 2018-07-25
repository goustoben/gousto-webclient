import React, { PropTypes } from 'react'
import css from './ModalScreen.css'
import ModalHeader from 'Modal/ModalHeader'

const ModalScreen = ({ children, title }) => (
	<div className={css.flex}>
		{title && <ModalHeader>{title}</ModalHeader>}
		{children}
	</div>
)

ModalScreen.defaultProps = {
	title: '',
	children: '',
}

ModalScreen.propTypes = {
	children: PropTypes.node.isRequired,
	title: PropTypes.string,
}

export default ModalScreen
