import React from 'react'
import { shallow } from 'enzyme'

import CheckBox from 'Form/CheckBox'
import { BillingAddress } from '../BillingAddress'
import { BillingAddressContainer } from '../AddressContainer'

describe('Billing Address', () => {
  let wrapper
  let store
  let context
  let dispatch
  let getState
  let subscribe
  let deliveryAddress
  let form
  let sectionName
  let change

  beforeEach(() => {
    store = {
      form: {
        payment: {
          values: {
            payment: { isBillingAddressDifferent: true },
          },
        },
      },
    }

    getState = jest.fn().mockReturnValue(store)
    subscribe = jest.fn().mockReturnValue(Promise.resolve())
    dispatch = jest.fn().mockReturnValue(Promise.resolve())

    context = {
      store: {
        getState,
        subscribe,
        dispatch,
      },
    }

    deliveryAddress = { houseNo: '', street: '', town: '', postcode: '' }
    form = 'payment'
    sectionName = 'payment'
    change = jest.fn()

    wrapper = shallow(
      <BillingAddress
        deliveryAddress={deliveryAddress}
        change={change}
        asyncValidate={jest.fn()}
        receiveRef={jest.fn()}
        scrollToFirstMatchingRef={jest.fn()}
        form={form}
        sectionName={sectionName}
        formValues={store.form.payment.values}
      />,
      { context }
    )
  })

  describe('rendering the component', () => {
    test('should render a container', () => {
      expect(wrapper.find({ 'data-testing': 'checkoutBillingAddressContainer' })).toHaveLength(1)
    })

    describe('when "isBillingAddressDifferent" is true', () => {
      beforeEach(() => {
        const formValues = {
          payment: { isBillingAddressDifferent: true },
        }

        wrapper = shallow(
          <BillingAddress
            deliveryAddress={deliveryAddress}
            form={form}
            formValues={formValues}
            sectionName={sectionName}
            asyncValidate={jest.fn()}
            receiveRef={jest.fn()}
            scrollToFirstMatchingRef={jest.fn()}
            change={change}
          />,
          { context }
        )
      })

      test('should render <BillingAddressContainer>', () => {
        expect(wrapper.find(BillingAddressContainer)).toHaveLength(1)
      })
    })

    describe('when "isBillingAddressDifferent" is false', () => {
      beforeEach(() => {
        const formValues = {
          payment: { isBillingAddressDifferent: false },
        }

        wrapper = shallow(
          <BillingAddress
            deliveryAddress={deliveryAddress}
            form={form}
            formValues={formValues}
            sectionName={sectionName}
            asyncValidate={jest.fn()}
            receiveRef={jest.fn()}
            scrollToFirstMatchingRef={jest.fn()}
            change={change}
          />,
          { context }
        )
      })

      test('should not render <BillingAddressContainer>', () => {
        expect(wrapper.find(BillingAddressContainer)).toHaveLength(0)
      })
    })
  })

  describe('toggle delivery address', () => {
    beforeEach(() => {
      const formValues = {
        payment: { isBillingAddressDifferent: false },
      }

      wrapper = shallow(
        <BillingAddress
          deliveryAddress={deliveryAddress}
          change={change}
          form={form}
          formValues={formValues}
          sectionName={sectionName}
          asyncValidate={jest.fn()}
          receiveRef={jest.fn()}
          scrollToFirstMatchingRef={jest.fn()}
        />,
        { context }
      )
    })

    test('should call the redux-form change() function with the correct parameters ', () => {
      wrapper.instance().toggleDeliveryAddress()
      expect(change).toHaveBeenCalledWith('payment', 'payment.isBillingAddressDifferent', true)
    })
  })

  describe('when checkbox is checked', () => {
    beforeEach(() => {
      wrapper.setProps({
        formValues: {
          payment: { isBillingAddressDifferent: false },
        },
      })
    })

    test('should renders properly', () => {
      expect(wrapper.text().includes('Billing address')).toBe(true)
      expect(wrapper.text().includes('My billing address is the same as my delivery address')).toBe(
        true
      )
    })

    describe('when checkbox is unchecked', () => {
      beforeEach(() => {
        wrapper.find({ dataTesting: 'checkoutBillingAddressToggle' }).prop('onChange')(false)
      })

      test('should call the redux-form change() function to set isBillingAddressDifferent', () => {
        expect(change).toHaveBeenCalledWith('payment', 'payment.isBillingAddressDifferent', true)
      })
    })
  })
})
