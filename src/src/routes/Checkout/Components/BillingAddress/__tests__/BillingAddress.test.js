import React from 'react'
import { shallow } from 'enzyme'

import { BillingAddress } from '../BillingAddress'
import Address from '../AddressContainer'

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
          values:{
            payment: {isBillingAddressDifferent: true}
          }
        }
      }
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

    deliveryAddress = {houseNo: '', street: '', town:'', postcode: ''}
    form = "payment"
    sectionName = "payment"
    change = jest.fn()

    wrapper = shallow(
      <BillingAddress
        deliveryAddress={deliveryAddress}
        change={change}
        asyncValidate={jest.fn()}
        receiveRef={jest.fn()}
        scrollToFirstMatchingRef={jest.fn()}
      />,
      { context }
    )
  })

  describe('rendering the component', () => {

    test('should render a <Div>', () => {
      expect(wrapper.type()).toEqual('div')
    })

    describe('when "isBillingAddressDifferent" is true', () => {
      beforeEach(() => {
        const formValues = {
          payment: {isBillingAddressDifferent: true}
        }

        wrapper = shallow(
          <BillingAddress
            deliveryAddress={deliveryAddress}
            formValues={formValues}
            sectionName={sectionName}
            asyncValidate={jest.fn()}
            receiveRef={jest.fn()}
            scrollToFirstMatchingRef={jest.fn()}
          />,
          { context }
        )

      })

      test('should render <Address>', () => {
        expect(wrapper.find(Address)).toHaveLength(1)
      })

      test('should render "Use Delivery address" as link text', () => {
        expect(wrapper.find('.link').text()).toContain('Use Delivery address')
      })
    })

    describe('when "isBillingAddressDifferent" is false', () => {
      beforeEach(() => {
        const formValues = {
          payment: {isBillingAddressDifferent: false}
        }

        wrapper = shallow(
          <BillingAddress
            deliveryAddress={deliveryAddress}
            formValues={formValues}
            sectionName={sectionName}
            asyncValidate={jest.fn()}
            receiveRef={jest.fn()}
            scrollToFirstMatchingRef={jest.fn()}
          />,
          { context }
        )

      })

      test('should not render <Address>', () => {
        expect(wrapper.find(Address)).toHaveLength(0)
      })

      test('should render "Use Delivery address" as link text', () => {
        expect(wrapper.find('.link').text()).toContain('Enter new billing address')
      })
    })
  })

  describe('toggle delivery address', () => {
    beforeEach(() => {
      const formValues = {
        payment: {isBillingAddressDifferent: false}
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
})
