import sinon from 'sinon'

import React from 'react'
import { shallow, mount } from 'enzyme'
import Immutable from 'immutable' /* eslint-disable new-cap */
import { FormSection } from 'redux-form'
import DeliveryComponent from 'routes/Checkout/Components/Delivery/Delivery'

import DeliveryAddress from 'routes/Checkout/Components/Delivery/DeliveryAddress'

describe('Delivery', () => {
  let wrapper
  let checkoutStepValidation
  let checkoutDeliveryAddress
  let checkoutDelivery
  let store
  let context
  let dispatch
  let getState

  beforeEach(() => {
    checkoutStepValidation = sinon.spy()
    checkoutDeliveryAddress = sinon.spy()
    checkoutDelivery = sinon.spy()
    dispatch = sinon.stub().returns(
      new Promise(resolve => {
        resolve()
      }),
    )
    store = {
      basket: Immutable.Map({
        stepsOrder: Immutable.List(),
        previewOrderId: 152,
      }),
      menuBoxPrices: Immutable.Map({}),
      auth: Immutable.Map({
        isAuthenticated: false,
      }),
      checkout: Immutable.fromJS({
        validations: {
          summary: true,
          aboutyou: true,
        },
      }),
      params: { stepName: 'aboutyou' },
      stepsOrder: Immutable.List(['boxdetails', 'summary', 'aboutyou']),
      recipes: Immutable.Map({}),
    }
    getState = sinon.stub().returns(store)

    context = {
      store: {
        getState,
        dispatch,
      },
    }

    wrapper = shallow(<DeliveryComponent />)
  })

  test('should return div', () => {
    expect(wrapper.type()).toEqual('div')
  })

  describe('rendering', () => {
    test('should render 1 <FormSection> component(s)', () => {
      expect(wrapper.find(FormSection).length).toEqual(1)
    })

    test('should render 1 <DeliveryAddress> component(s)', () => {
      expect(wrapper.find(DeliveryAddress).length).toEqual(1)
    })
  })
})
