import { connect } from 'react-redux'
import PromoModalWrapper from './PromoModalWrapper'

const mapStateToProps = state => ({
  promoModalVisible: state.promoModalVisible,
})

export default connect(mapStateToProps, {})(PromoModalWrapper)
