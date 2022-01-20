import Immutable from 'immutable'
import { validationMessages, mapStateToProps, getInitialValues } from '../DeliveryContainer'

jest.mock('redux-form', () => ({
  getFormValues: jest.fn(() => () => ({
    delivery: {
      addressId: 'placeholder',
      addressType: 'home',
      addressesFetched: false,
    },
  })),
  submit: jest.fn(),
  getFormMeta: jest.fn(() => () => ({
    delivery: {
      postcodeTemp: { touched: true },
    },
  })),
  change: jest.fn(),
}))

describe('Given validationMessages', () => {
  let output
  const expected = {
    'section.phone': 'Please provide a valid UK phone number',
    'section.addressId': 'Please select an address',
  }

  describe('When validationMessages is called', () => {
    beforeEach(() => {
      output = validationMessages('section')
    })

    test('Then should return proper values', () => {
      expect(output).toEqual(expected)
    })
  })
})

describe('Given mapStateToProps', () => {
  describe('When mapStateToProps is called', () => {
    let output
    const initialState = {
      checkout: Immutable.Map({
        selectedAddress: '',
        deliveryAddresses: '',
        selectedAddressId: '',
      }),
      basket: Immutable.Map({
        postcode: '',
        date: '2020-02-15',
        slotId: '',
      }),
      error: Immutable.Map({
        BOXSUMMARY_DELIVERY_DAYS_RECEIVE: false,
      }),
      pending: Immutable.Map({
        CHECKOUT_ADDRESSES_RECEIVE: false,
      }),
      form: Immutable.fromJS({
        yourdetails: {
          syncErrors: ['error'],
        },
      }),
    }

    beforeEach(() => {
      output = mapStateToProps('delivery')(initialState)
    })

    test('Then should return proper values', () => {
      const expected = {
        sectionName: 'delivery',
      }
      expect(output).toEqual(expect.objectContaining(expected))
    })
  })
})

describe('Given getInitialValues', () => {
  const sectionName = 'delivery'
  const commonProps = {
    addressId: 'placeholder',
    notFound: false,
    addressType: 'home',
    addresses: [],
    confirmed: false,
  }

  describe('When getInitialValues is called', () => {
    let output
    const initialState = {
      basket: Immutable.Map({
        phone: '123',
      }),
    }

    beforeEach(() => {
      output = getInitialValues(initialState, sectionName)
    })

    test('Then should return proper values', () => {
      const expected = {
        delivery: {
          ...commonProps,
          deliveryInstruction: 'Please select an option',
          phone: '123',
          firstName: '',
          lastName: '',
        },
      }
      expect(output).toEqual(expect.objectContaining(expected))
    })
  })
})
