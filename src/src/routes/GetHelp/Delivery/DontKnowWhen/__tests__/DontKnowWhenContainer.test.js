import React from 'react'
import thunk from 'redux-thunk'
import { fromJS } from 'immutable'
import { mount } from 'enzyme'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { getHelp } from 'reducers/getHelp'
import { DontKnowWhenContainer } from '../DontKnowWhenContainer'

const DELIVERY_DATE = '2020-07-17 00:00:00'
const TRACKING_URL = 'https://amazing-courier.com/order/1234'
let wrapper

describe('Given DontKnowWhenContainer mounts', () => {
  beforeEach(() => {
    const store = createStore(
      combineReducers({ getHelp }),
      {
        getHelp: fromJS({
          order: {
            deliveryDate: DELIVERY_DATE,
            trackingURL: TRACKING_URL,
          },
        }),
      },
      compose(applyMiddleware(thunk))
    )
    wrapper = mount(
      <DontKnowWhenContainer
        store={store}
      />
    )
  })

  test('the container connects with the DontKnowWhen component', () => {
    expect(wrapper.find('DontKnowWhen')).toHaveLength(1)
  })

  test.each([
    ['getHelp.order.deliveryDate', 'deliveryDate', DELIVERY_DATE],
    ['getHelp.order.trackingURL', 'trackingURL', TRACKING_URL],
  ])('the container connects the store piece %s to the %s prop of the component', (_storePath, prop, expectedValue) => {
    expect(wrapper.find('DontKnowWhen').prop(prop))
      .toBe(expectedValue)
  })
})
