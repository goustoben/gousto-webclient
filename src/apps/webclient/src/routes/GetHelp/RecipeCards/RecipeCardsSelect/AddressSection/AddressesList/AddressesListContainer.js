import { connect } from 'react-redux'
import { setSelectedAddress, trackRecipeCardsAddressChangeArticle } from '../../../../actions/getHelp'
import { getShippingAddresses, getSelectedAddress } from '../../../../selectors/addressSelectors'
import { AddressesList } from './AddressesList'

const mapStateToProps = (state) => ({
  userAddresses: getShippingAddresses(state),
  selectedAddress: getSelectedAddress(state)
})
export const AddressesListContainer = connect(mapStateToProps, {
  setSelectedAddress,
  trackRecipeCardsAddressChangeArticle
})(AddressesList)
