import React from 'react'
import thunk from 'redux-thunk'
import moment from 'moment'
import MockDate from 'mockdate'
import { Map } from 'immutable'
import { mount } from 'enzyme'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import authReducer, { initialState as authDefaultState } from 'reducers/auth'
import userReducer, { defaultState as userDefaultState } from 'reducers/user'
import status from 'reducers/status'
import { fetchDeliveryConsignment } from 'apis/deliveries'
import { fetchUserOrders } from 'apis/user'
import { DeliveryContainer } from '../DeliveryContainer'

jest.mock('apis/deliveries')
jest.mock('apis/user')

describe('given DeliveryContainer is rendered', () => {
  const deliveryDateFormat = 'YYYY-MM-DD HH:mm:ss'
  let wrapper

  beforeAll(() => {
    MockDate.set('2020-09-25')

    const store = createStore(
      combineReducers({
        ...authReducer,
        ...userReducer,
        ...status,
      }),
      {
        auth: authDefaultState(),
        user: userDefaultState,
        error: Map({}),
        pending: Map({}),
      },
      compose(applyMiddleware(thunk))
    )

    fetchUserOrders.mockResolvedValueOnce({
      data: [
        {
          id: '1',
          userId: 'u1',
          deliveryDate: moment().add(2, 'hours').format(deliveryDateFormat),
          deliverySlot: {
            deliveryEnd: '18:59:59',
            deliveryStart: '08:00:00'
          },
        },
        {
          id: '2',
          userId: 'u2',
          deliveryDate: moment().add(10, 'days').format(deliveryDateFormat),
          deliverySlot: {
            deliveryEnd: '18:59:59',
            deliveryStart: '08:00:00'
          },
        },
      ]
    })

    fetchDeliveryConsignment.mockResolvedValueOnce({
      data: [{
        trackingUrl: 'http://tracking-my-order'
      }]
    })

    wrapper = mount(
      <DeliveryContainer store={store} />
    )
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('nextOrderTracking is being set correctly', async () => {
    await wrapper.update()

    expect(wrapper.find('Delivery').prop('nextOrderTracking')).toBe('http://tracking-my-order')
  })
})
