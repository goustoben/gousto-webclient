import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import { menuLoadDays, redirect } from 'actions'
import { loadMenuServiceDataIfDeepLinked } from 'utils/menuService'
import { StepIndicator } from 'goustouicomponents'

import { Signup } from 'routes/Signup/Signup'

jest.mock('actions', () => ({
  signupStepsReceive: jest.fn().mockReturnValue(Promise.resolve()),
  signupSetStep: jest.fn().mockReturnValue(Promise.resolve()),
  redirect: jest.fn().mockReturnValue(Promise.resolve()),
  menuLoadDays: jest.fn().mockReturnValue(Promise.resolve()),
}))

jest.mock('utils/menuService')

describe('Signup', () => {
  let store
  let context
  let dispatch
  let getState
  let subscribe

  beforeEach(() => {
    store = {
      features: Immutable.List(),
      signup: Immutable.List(),
    }

    getState = jest.fn().mockReturnValue(store)
    dispatch = jest.fn().mockReturnValue(Promise.resolve())

    context = {
      store: {
        getState,
        subscribe,
        dispatch,
      },
    }
  })

  afterEach(() => {
    redirect.mockClear()
    menuLoadDays.mockClear()
    menuLoadDays.mockReset()
    loadMenuServiceDataIfDeepLinked.mockClear()
  })

  describe('fetchData', () => {
    test('loadMenuServiceDataIfDeepLinked', async () => {
      await Signup.fetchData({
        store: context.store,
        query: { },
        params: { },
      })
      expect(loadMenuServiceDataIfDeepLinked).toHaveBeenCalled()
      expect(dispatch).toHaveBeenCalled()
      expect(menuLoadDays).toHaveBeenCalledTimes(1)
    })
  })

  describe('Step size on Signup', () => {
    let wrapper
    describe('when isTastePreferencesEnabled is true', () => {
      beforeEach(() => {
        wrapper = shallow(<Signup isTastePreferencesEnabled />, { context })
      })

      test('should display step size 5', () => {
        expect(wrapper.find(StepIndicator).prop('size')).toEqual(5)
      })
    })

    describe('when isTastePreferencesEnabled is false', () => {
      beforeEach(() => {
        wrapper = shallow(<Signup isTastePreferencesEnabled={false} />, { context })
      })

      test('should display step size 3', () => {
        expect(wrapper.find(StepIndicator).prop('size')).toEqual(3)
      })
    })
  })
})
