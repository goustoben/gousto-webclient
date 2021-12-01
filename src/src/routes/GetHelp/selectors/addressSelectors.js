export const getShippingAddresses = (state) => state.getHelp.get('shippingAddresses').toJS()

// remove ? once selectedAddress is in redux
export const getSelectedAddress = (state) => state.getHelp.get('selectedAddress')?.toJS()
