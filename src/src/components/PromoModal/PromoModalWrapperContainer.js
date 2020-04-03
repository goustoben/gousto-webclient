import { connect } from 'react-redux'
import { PromoModalWrapper as ModalWrapper } from './PromoModalWrapper'

const mapStateToProps = state => ({
  promoModalVisible: state.promoModalVisible,
})

export const PromoModalWrapper = connect(mapStateToProps, {})(ModalWrapper)
