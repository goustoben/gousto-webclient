import React from 'react'
import thunk from 'redux-thunk'
import Immutable from 'immutable'
import { mount } from 'enzyme'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import * as userApi from 'apis/user'
import authReducer, { initialState as authDefaultState } from 'reducers/auth'
import userReducer, { defaultState as userDefaultState } from 'reducers/user'
import featuresReducer, { initialState as featuresDefaultState } from 'reducers/features'
import status from 'reducers/status'
import { UserCreditMessageContainer } from '../UserCreditMessageContainer'

jest.mock('apis/user', () => ({
  fetchUserCredit: jest.fn(),
}))

const getStore = (enableFeature = true) => (
  createStore(
    combineReducers(
      {
        ...authReducer,
        ...featuresReducer,
        ...userReducer,
        ...status,
      }
    ),
    {
      auth: authDefaultState(),
      features: featuresDefaultState().set('showUserCredit', Immutable.fromJS({
        experiment: enableFeature,
        value: enableFeature,
      })),
      user: userDefaultState,
    },
    compose(applyMiddleware(thunk))
  )
)

describe('UserCreditMessageContainer', () => {
  describe('the feature flag is enabled', () => {
    describe('and credit is set to higher than 0', () => {
      const store = getStore()
      let wrapper = null

      beforeEach(() => {
        userApi.fetchUserCredit.mockReset()
        userApi.fetchUserCredit.mockResolvedValueOnce({
          data: { balance: '5.00' }
        })

        wrapper = mount(
          <UserCreditMessageContainer store={store} />
        )
      })

      test('the userFetchCredit action is being called correctly', () => {
        expect(userApi.fetchUserCredit).toHaveBeenCalledTimes(1)
      })

      test('the Alert component is rendered and displays the user credit', () => {
        expect(
          wrapper.find('Alert').find('Heading').contains('Credit £5.00')
        ).toBe(true)
      })
    })

    describe('and credit is set to lower than 1', () => {
      const store = getStore()
      let wrapper = null

      beforeEach(() => {
        userApi.fetchUserCredit.mockReset()
        userApi.fetchUserCredit.mockResolvedValueOnce({
          data: { balance: '0' }
        })

        wrapper = mount(
          <UserCreditMessageContainer store={store} />
        )
      })

      test('the Alert component is not rendered', () => {
        expect(wrapper.find('Alert').length).toBe(0)
      })
    })
  })

  describe('the feature flag is disabled', () => {
    const store = getStore(false)
    let wrapper = null

    beforeEach(() => {
      userApi.fetchUserCredit.mockReset()

      wrapper = mount(
        <UserCreditMessageContainer store={store} />
      )
    })

    test('the userFetchCredit action is not being called', () => {
      expect(userApi.fetchUserCredit).toHaveBeenCalledTimes(0)
    })

    test('the Alert component is not rendered', () => {
      expect(wrapper.find('Alert').length).toBe(0)
    })
  })
})
