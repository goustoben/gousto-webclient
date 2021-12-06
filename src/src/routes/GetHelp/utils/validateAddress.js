export const getValidAddressForOrder = (userAddresses, orderAddress, defaultShippingAddressId) => {
  if (!userAddresses.length || !orderAddress || !defaultShippingAddressId) {
    return null
  }

  if (userAddresses.some(address => address.id === orderAddress.id)) {
    return orderAddress
  } else {
    const defaultAddress = userAddresses.find(
      userAddress => userAddress.id === defaultShippingAddressId
    )

    return defaultAddress
  }
}
