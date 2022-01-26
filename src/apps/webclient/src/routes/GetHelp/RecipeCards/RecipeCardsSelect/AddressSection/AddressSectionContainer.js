import { connect } from 'react-redux'
import { AddressSection } from './AddressSection'
import {
  getSelectedAddress,
  getShippingAddresses
} from '../../../selectors/addressSelectors'
import { loadShippingAddresses } from '../../../actions/loadShippingAddresses'

const mapStateToProps = (state) => ({
  selectedAddress: getSelectedAddress(state),
  showChangeButton: getShippingAddresses(state)?.length > 1
})

const AddressSectionContainer = connect(mapStateToProps, {
  loadShippingAddresses,
})(AddressSection)

export {
  AddressSectionContainer
}
