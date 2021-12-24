export const getValidAddressForOrder = (userAddresses, orderAddress, defaultShippingAddress) => {
  if (!userAddresses.length || !orderAddress || !defaultShippingAddress) {
    return null
  }

  if (userAddresses.some(address => address.id === orderAddress.id)) {
    return orderAddress
  }

  return defaultShippingAddress
}
