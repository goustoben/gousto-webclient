export const getDefaultShippingAddressId = (state) => state.user.get('shippingAddressId')
export const getShippingAddresses = (state) => state.getHelp.get('shippingAddresses').toJS()
export const getOrderShippingAddress = (state) => state.getHelp.getIn(['order', 'shippingAddress'])?.toJS()
export const getSelectedAddress = (state) => state.getHelp.get('selectedAddress')?.toJS()
