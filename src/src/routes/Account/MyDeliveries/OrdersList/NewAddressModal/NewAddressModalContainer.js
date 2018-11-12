import { connect } from 'react-redux'
import NewAddressModal from './NewAddressModal'
import userActions from 'actions/user'

const mapStateToProps = (state) => ({
  isModalOpen: state.user.getIn(['deliveryAddressModal', 'visibility']),
})

export default connect(mapStateToProps, {
  userToggleNewAddressModal: userActions.userToggleNewAddressModal,
})(NewAddressModal)
