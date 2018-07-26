import React, { PropTypes } from 'react'
import ModalPanel from 'Modal/ModalPanel'
import Overlay from 'Overlay'
import CancelOrderModalContent from './CancelOrderModalContent'

class CancelOrderModal extends React.PureComponent {

	static propTypes = {
		close: PropTypes.func,
		cancelOrderModalOpen: PropTypes.bool,
	}

	static defaultProps = {
		close: () => {},
		cancelOrderModalOpen: false,
	}

	render() {
		const { cancelOrderModalOpen, close } = this.props

		return (
			<Overlay open={Boolean(cancelOrderModalOpen)} from="top">
				<ModalPanel closePortal={close} disableOverlay>
					<CancelOrderModalContent close={close} />
				</ModalPanel>
			</Overlay>
		)
	}
}

export default CancelOrderModal
