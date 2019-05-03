import { isBillingAddressDifferent } from 'routes/Checkout/utils/state'

import { getBillingAddress, transformBillingAddress } from 'routes/Checkout/Components/CheckoutPayment/CheckoutFrame/utils'

jest.mock('routes/Checkout/utils/state', () => ({
  isBillingAddressDifferent: jest.fn()
}))

jest.mock('routes/Checkout/Components/CheckoutPayment/config', () => ({
  sectionName: 'payment',
  deliveryAddressSectionName: 'delivery',
}))

describe('CheckoutFrame utils', () => {
  const paymentAddress = {
    houseNo: 'HOUSES OF PARLIAMENT',
    street: '',
    town: 'LONDON',
    postcode: 'SW1A 0AA',
  }

  const deliveryAddress = {
    houseNo: 'THE SHARD',
    street: '32 LONDON BRIDGE STREET',
    town: 'LONDON',
    postcode: 'SE1 9SG',
  }

  const getFormValues = () => ({
    payment: paymentAddress,
    delivery: deliveryAddress,
  })

  const formValues = getFormValues()

  describe('getBillingAddress', () => {
    describe('when formValues is not set', () => {
      test('should return an empty object', () => {
        expect(getBillingAddress()).toEqual({})
      })
    })

    describe('when formValues is set', () => {
      describe('when selected billing address is diffrerent', () => {
        beforeEach(() => {
          isBillingAddressDifferent.mockReturnValueOnce(true)
        })

        test('should return the payment billing address', () => {
          expect(getBillingAddress(formValues)).toEqual(transformBillingAddress(paymentAddress))
        })
      })

      describe('when selected billing address is the same as delivery address', () => {
        beforeEach(() => {
          isBillingAddressDifferent.mockReturnValueOnce(false)
        })

        test('should return the delivery address', () => {
          expect(getBillingAddress(formValues)).toEqual(transformBillingAddress(deliveryAddress))
        })
      })
    })
  })

  describe('transformBillingAddress', () => {
    describe('should transform addresses into checkout.com addresses', () => {
      expect(transformBillingAddress(deliveryAddress)).toEqual({
        addressLine1: 'THE SHARD',
        addressLine2: '32 LONDON BRIDGE STREET',
        city: 'LONDON',
        postcode: 'SE1 9SG',
      })
    })
  })
})
