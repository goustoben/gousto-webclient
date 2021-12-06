import { connect } from 'react-redux'
import { AddressSection } from './AddressSection'
import {
  getSelectedAddress,
} from '../../../selectors/addressSelectors'
import { loadShippingAddresses } from '../../../actions/loadShippingAddresses'
import { storeSelectedAddress } from '../../../actions/getHelp'

const mapStateToProps = (state) => ({
  selectedAddress: getSelectedAddress(state),
})

const AddressSectionContainer = connect(mapStateToProps, {
  loadShippingAddresses,
  storeSelectedAddress,
})(AddressSection)

export {
  AddressSectionContainer
}
