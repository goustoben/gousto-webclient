import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import configureMockStore from 'redux-mock-store'
import { DuplicateOrderModalContainer } from 'DuplicateOrderModal/DuplicateOrderModalContainer'

describe('DuplicateOrderModalContainer', () => {
  let wrapper

  beforeEach(() => {
    const mockStore = configureMockStore()

    const store = mockStore({
      temp: Immutable.Map({}),
    })

    wrapper = shallow(<DuplicateOrderModalContainer store={store} />)
  })

  describe('with the default state', () => {
    test('shouldnt blow up', () => {
      expect(wrapper.find('DuplicateOrderModal')).toBeDefined()
    })
    test('should set the closeOrders prop to an empty Immutable Map', () => {
      expect(Immutable.is(wrapper.find('DuplicateOrderModal').prop('closeOrders'), Immutable.Map([]))).toBe(
        true,
      )
    })
  })

  describe('with close orders', () => {
    beforeEach(() => {
      const mockStore = configureMockStore()

      const store = mockStore({
        temp: Immutable.fromJS({
          closeOrderIds: ['123', '234', '345', '456', '567'],
        }),
        user: Immutable.fromJS({
          orders: [
            { id: '123' },
            { id: '234' },
            { id: '345' },
            { id: '999' },
          ],
        }),
      })

      wrapper = shallow(<DuplicateOrderModalContainer store={store} />)
    })

    test('shouldnt blow up', () => {
      expect(wrapper.find('DuplicateOrderModal')).toBeDefined()
    })

    test('should set the closeOrders prop to an Immutable List containing the orders which are in the users orders', () => {
      expect(wrapper.find('DuplicateOrderModal').prop('closeOrders').toJS()).toEqual([
        { id: '123' },
        { id: '234' },
        { id: '345' },
      ])
    })
  })
})
