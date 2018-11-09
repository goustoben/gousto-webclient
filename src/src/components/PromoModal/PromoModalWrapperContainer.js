import PromoModalWrapper from './PromoModalWrapper'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  promoModalVisible: state.promoModalVisible,
})

export default connect(mapStateToProps, {})(PromoModalWrapper)
