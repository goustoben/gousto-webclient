import React from 'react'
import Overlay from 'Overlay'
import DuplicateOrderModal from './DuplicateOrderModalContainer'

const DuplicateOrderModalWrapper = ({ visible }) => (
	<Overlay open={visible} from="top">
		<DuplicateOrderModal />
	</Overlay>
)

DuplicateOrderModalWrapper.propTypes = {
  visible: React.PropTypes.bool,
}

export default DuplicateOrderModalWrapper
