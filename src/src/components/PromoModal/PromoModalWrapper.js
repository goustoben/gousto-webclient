import React from 'react'
import Overlay from 'Overlay'
import PromoModal from './PromoModalContainer'

const PromoModalWrapper = ({ promoModalVisible }) => (
	<Overlay open={promoModalVisible} from="top">
		<PromoModal />
	</Overlay>
)

PromoModalWrapper.propTypes = {
  promoModalVisible: React.PropTypes.bool,
}

export default PromoModalWrapper
