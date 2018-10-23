import PropTypes from 'prop-types'
import React from 'react'
import Overlay from 'Overlay'
import PromoModal from './PromoModalContainer'

const PromoModalWrapper = ({ promoModalVisible }) => (
	<Overlay open={promoModalVisible} from="top">
		<PromoModal />
	</Overlay>
)

PromoModalWrapper.propTypes = {
	promoModalVisible: PropTypes.bool,
}

export default PromoModalWrapper
