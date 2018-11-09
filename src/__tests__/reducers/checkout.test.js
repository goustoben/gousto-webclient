import actionTypes from 'actions/actionTypes'
import Immutable from 'immutable' /* eslint-disable new-cap */
import checkoutReducer from 'reducers/checkout'

describe('checkout reducer', () => {
  describe('initial state', () => {
    const expectedState = Immutable.fromJS({
      isDuplicateUser: null,
      addressEdited: false,
      billingAddressEdited: false,
      confirmedAddress: false,
      selectedAddress: {},
      deliveryAddress: {
        companyName: '',
        line1: '',
        line2: '',
        line3: '',
        town: '',
        county: '',
        postcode: '',
      },
      deliveryAddresses: [],
      selectedAddressId: '',

      billingaddresstoggle: 'hidebillingaddress',
      billingAddresses: [],
      billingAddressId: '',
      selectedBillingAddress: {},
      billingAddress: {
        companyName: '',
        line1: '',
        line2: '',
        line3: '',
        town: '',
        county: '',
        postcode: '',
      },
      errors: {},
    })

    describe('CHECKOUT_ERRORS_CLEAR action type', () => {
      test('should reset isDuplicateUser and errors', () => {
        const action = {
          type: actionTypes.CHECKOUT_ERRORS_CLEAR,
        }

        const initialState = Immutable.Map({
          errors: {
            something: true,
          },
        })

        const result = checkoutReducer.checkout(initialState, action)
        expect(
          Immutable.is(
            result,
            Immutable.fromJS({
              errors: {},
            }),
          ),
        ).toBe(true)
      })
    })
  })
})
