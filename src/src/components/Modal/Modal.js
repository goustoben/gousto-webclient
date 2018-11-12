import React from 'react'
import Portal from 'react-portal'
import ModalPanel from './ModalPanel'

class GoustoModal extends React.Component {
	static propTypes = {
	  children: React.PropTypes.node.isRequired,
	  openByClickOn: React.PropTypes.node,
	  closeOnEsc: React.PropTypes.bool,
	  closeOnOutsideClick: React.PropTypes.bool,
	  onOpen: React.PropTypes.func,
	  beforeClose: React.PropTypes.func,
	  isOpened: React.PropTypes.bool,
	  onClose: React.PropTypes.func,
	  onUpdate: React.PropTypes.func,
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
