import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import configureMockStore from 'redux-mock-store'
import { DuplicateOrderModalWrapperContainer } from 'DuplicateOrderModal/DuplicateOrderModalWrapperContainer'
import { DuplicateOrderModalWrapper } from 'DuplicateOrderModal/DuplicateOrderModalWrapper'

describe('DuplicateOrderModalWrapperContainer', () => {
  let wrapper

  beforeEach(() => {
    const mockStore = configureMockStore()

    const store = mockStore({
      temp: Immutable.Map({}),
    })

    wrapper = shallow(<DuplicateOrderModalWrapperContainer store={store} />)
  })

  describe('with the default state', () => {
    test('shouldnt blow up', () => {
      expect(wrapper.find('DuplicateOrderModalWrapper')).toBeDefined()
    })

    test('should set the visible prop to false', () => {
      expect(wrapper.find('DuplicateOrderModalWrapper').prop('visible')).toEqual(false)
    })
  })

  describe('with one close order', () => {
    beforeEach(() => {
      const mockStore = configureMockStore()

      const store = mockStore({
        temp: Immutable.fromJS({
          closeOrderIds: ['123'],
        }),
      })

      wrapper = shallow(<DuplicateOrderModalWrapperContainer store={store} />)
    })

    test('shouldnt blow up', () => {
      expect(wrapper.find('DuplicateOrderModalWrapper')).toBeDefined()
    })

    test('should set the visible prop to false', () => {
      expect(wrapper.find('DuplicateOrderModalWrapper').prop('visible')).toEqual(false)
    })
  })

  describe('with multiple close orders', () => {
    beforeEach(() => {
      const mockStore = configureMockStore()

      const store = mockStore({
        temp: Immutable.fromJS({
          closeOrderIds: ['123', '234', '345', '456', '567'],
        }),
      })

      wrapper = shallow(<DuplicateOrderModalWrapperContainer store={store} />)
    })

    test('shouldnt blow up', () => {
      expect(wrapper.find('DuplicateOrderModalWrapper').type()).toEqual(DuplicateOrderModalWrapper)
    })

    test('should set the visible prop to true', () => {
      expect(wrapper.find('DuplicateOrderModalWrapper').prop('visible')).toEqual(true)
    })
  })
})
