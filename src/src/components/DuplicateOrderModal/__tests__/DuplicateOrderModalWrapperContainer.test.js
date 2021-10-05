import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'

import DuplicateOrderModalWrapperContainer from 'DuplicateOrderModal/DuplicateOrderModalWrapperContainer'
import DuplicateOrderModalWrapper from 'DuplicateOrderModal/DuplicateOrderModalWrapper'

describe('DuplicateOrderModalWrapperContainer', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<DuplicateOrderModalWrapperContainer />, {
      context: {
        store: {
          getState: () => ({
            temp: Immutable.Map({}),
          }),
          subscribe: () => {},
          dispatch: () => {},
        },
      },
    })
  })

  describe('with the default state', () => {
    test('shouldnt blow up', () => {
      expect(wrapper.type()).toEqual(DuplicateOrderModalWrapper)
    })
    test('should set the visible prop to false', () => {
      expect(wrapper.prop('visible')).toEqual(false)
    })
  })

  describe('with one close order', () => {
    beforeEach(() => {
      wrapper = shallow(<DuplicateOrderModalWrapperContainer />, {
        context: {
          store: {
            getState: () => ({
              temp: Immutable.fromJS({
                closeOrderIds: ['123'],
              }),
            }),
            subscribe: () => {},
            dispatch: () => {},
          },
        },
      })
    })
    test('shouldnt blow up', () => {
      expect(wrapper.type()).toEqual(DuplicateOrderModalWrapper)
    })
    test('should set the visible prop to false', () => {
      expect(wrapper.prop('visible')).toEqual(false)
    })
  })

  describe('with multiple close orders', () => {
    beforeEach(() => {
      wrapper = shallow(<DuplicateOrderModalWrapperContainer />, {
        context: {
          store: {
            getState: () => ({
              temp: Immutable.fromJS({
                closeOrderIds: ['123', '234', '345', '456', '567'],
              }),
            }),
            subscribe: () => {},
            dispatch: () => {},
          },
        },
      })
    })
    test('shouldnt blow up', () => {
      expect(wrapper.type()).toEqual(DuplicateOrderModalWrapper)
    })
    test('should set the visible prop to true', () => {
      expect(wrapper.prop('visible')).toEqual(true)
    })
  })
})
