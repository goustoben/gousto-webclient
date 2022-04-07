import Immutable from 'immutable'

export const buildUserAddresses = ({ hasShipping, customShippingAddress, customBillingAddress }) => {
  const baseBillingAddress = {
    34005998: {
      type: 'billing',
      id: '34005998',
      line1: 'Gousto Shepherds Building',
      line2: 'Unit 1.8/1.9',
      line3: 'Charecroft Way',
    }
  }

  const baseShippingAddress = {
    34005976: {
      type: 'shipping',
      id: '34005976',
      line1: 'Gousto Shepherds Building',
      line2: 'Unit 1.8/1.9',
      line3: 'Charecroft Way',
    },
  }

  const buildState = () => {
    if (!hasShipping) {
      return {
        user: Immutable.fromJS({
          addresses: {
            ...baseBillingAddress,
            ...customBillingAddress,
          },
        }),
      }
    }

    return {
      user: Immutable.fromJS({
        addresses: {
          ...baseShippingAddress,
          ...baseBillingAddress,
          ...customShippingAddress,
          ...customBillingAddress,
        },
      }),
    }
  }

  return {
    state: buildState(),
    getShippingAddress: { ...baseShippingAddress, ...customShippingAddress, },
    getBillingAddress: { ...baseBillingAddress, ...customBillingAddress, },
  }
}
