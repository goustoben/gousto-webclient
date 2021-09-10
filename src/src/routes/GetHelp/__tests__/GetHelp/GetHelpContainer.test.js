import React from 'react'
import thunk from 'redux-thunk'
import { mount } from 'enzyme'
import { Map } from 'immutable'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'

import status from 'reducers/status'
import authReducer, { initialState as authDefaultState } from 'reducers/auth'
import contentReducer from 'reducers/content'
import userReducer, { defaultState as userDefaultState } from 'reducers/user'
import { getHelp, getHelpInitialState } from 'reducers/getHelp'
import { GetHelpContainer } from 'routes/GetHelp/GetHelpContainer'

jest.mock('../../actions/getHelp', () => ({
  loadOrderById: () => () => {},
  loadOrderAndRecipesByIds: () => () => {},
  validateLatestOrder: () => () => {}
}))
jest.mock('actions/getHelp', () => ({
  storeGetHelpOrderId: () => () => {}
}))

describe('<GetHelpContainer />', () => {
  let wrapper
  let store

  beforeEach(() => {
    const initialState = {
      auth: authDefaultState(),
      getHelp: getHelpInitialState,
      user: userDefaultState,
      error: Map({}),
      pending: Map({}),
    }

    store = createStore(
      combineReducers({
        getHelp,
        ...contentReducer,
        ...authReducer,
        ...userReducer,
        ...status,
      }),
      initialState,
      compose(applyMiddleware(thunk))
    )

    wrapper = mount(
      <GetHelpContainer
        location={{ query: { orderId: '788' }, pathname: 'get-help' }}
        store={store}
        params={{ userId: '123', orderId: '456' }}
      >
        <div>Required Child</div>
      </GetHelpContainer>
    )
  })

  test('should pass down right props to GetHelp ', () => {
    const GetHelp = wrapper.find('GetHelp')
    expect(GetHelp.prop('content')).toEqual({
      title: 'Get help with your box',
      errorBody: 'There was a problem in getting your order information. Please contact us below, or try again later.',
      button1: 'Contact Us'
    })
    expect(GetHelp.prop('didRequestError')).toBe(false)
    expect(GetHelp.prop('isRequestPending')).toBe(false)
    expect(GetHelp.prop('orderId')).toEqual('788')
    expect(GetHelp.prop('location')).toEqual({
      pathname: 'get-help',
      query: {
        orderId: '788'
      }
    })
  })

  describe('when path is in exception list', () => {
    beforeEach(() => {
      wrapper.setProps({location: { query: { orderId: '788' }, pathname: '/get-help/contact' }})
    })

    test('should pass down didRequestError to be false ', () => {
      const GetHelp = wrapper.find('GetHelp')
      expect(GetHelp.prop('didRequestError')).toBe(false)
    })
  })

  describe('when location query is not defined', () => {
    beforeEach(() => {
      wrapper.setProps({location: { pathname: '/get-help/contact' }, params: { orderId: '123'}})
    })

    test('should pass down orderId to equal 123 from params ', () => {
      const GetHelp = wrapper.find('GetHelp')
      expect(GetHelp.prop('orderId')).toEqual('123')
    })

    describe('and params are not defined', () => {
      beforeEach(() => {
        wrapper.setProps({location: { pathname: '/get-help/contact' }, params: {} })
      })

      test('should pass down orderId to equal empty string', () => {
        const GetHelp = wrapper.find('GetHelp')
        expect(GetHelp.prop('orderId')).toEqual('')
      })
    })
  })
})
