import { connect } from 'react-redux'
import userActions from 'actions/user'
import NewAddressModal from './NewAddressModal'

const mapStateToProps = (state) => ({
  isModalOpen: state.user.getIn(['deliveryAddressModal', 'visibility']),
})

export default connect(mapStateToProps, {
  userToggleNewAddressModal: userActions.userToggleNewAddressModal,
})(NewAddressModal)
