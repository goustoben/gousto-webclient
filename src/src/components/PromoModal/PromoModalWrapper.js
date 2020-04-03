import PropTypes from 'prop-types'
import React from 'react'
import Overlay from 'Overlay'
import { PromoModalContainer } from './PromoModalContainer'

export const PromoModalWrapper = ({ promoModalVisible }) => (
  <Overlay open={promoModalVisible} from="top">
    <PromoModalContainer />
  </Overlay>
)

PromoModalWrapper.propTypes = {
  promoModalVisible: PropTypes.bool,
}

PromoModalWrapper.defaultProps = {
  promoModalVisible: true,
}
