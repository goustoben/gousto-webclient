import PropTypes from 'prop-types';
import React from 'react'
import Portal from 'react-portal'
import ModalPanel from './ModalPanel'

class GoustoModal extends React.Component {
	static propTypes = {
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

	static defaultProps = {
		closeOnEsc: true,
		closeOnOutsideClick: true,
		isOpened: false,
		onOpen: () => {},
		onClose: () => {},
		onUpdate: () => {},
	}

	render() {
		return (
			<Portal {...this.props}>
				<ModalPanel>
					{React.cloneElement(this.props.children, { isOpen: this.props.isOpened })}
				</ModalPanel>
			</Portal>
		)
	}
}

export default GoustoModal
