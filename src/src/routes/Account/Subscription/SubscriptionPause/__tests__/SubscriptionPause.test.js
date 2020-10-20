import React from 'react'
import { mount } from 'enzyme'

import SubscriptionPause from '../SubscriptionPause'

let wrapper

const mockUserLoadNewOrders = jest.fn()
const mockFetchData = jest.fn()

const mockProps = {
  subscriptionPauseFetchReasons: () => { },
  userLoadNewOrders: mockUserLoadNewOrders,
  dataLoaded: true,
  fetchData: mockFetchData,
  showModal: true
}

const shouldComponentUpdateSpy = jest.spyOn(SubscriptionPause.prototype, 'render')

const mountWithProps = (props = {}) => {
  wrapper = mount(<SubscriptionPause {...mockProps} {...props} />)
}

describe('Given I render SubScriptionPause', () => {
  beforeEach(() => {
    mountWithProps()
  })

  test('Then new orders are loaded', () => {
    expect(mockUserLoadNewOrders).toHaveBeenCalled()
  })

  test('Then data is not fetched initially', () => {
    expect(mockFetchData).not.toHaveBeenCalled()
  })

  describe('And the component updates', () => {
    test('Then data is fetched', () => {
      mountWithProps({ dataLoaded: false })
      wrapper.setProps({ dataLoaded: true })
      wrapper.update()

      expect(mockFetchData).toHaveBeenCalled()
    })
  })

  describe('And the component receives new props', () => {
    beforeEach(() => {
      shouldComponentUpdateSpy.mockClear()
    })

    test('Then it should re-render', () => {
      mountWithProps()
      wrapper.setProps({ dataLoaded: false })

      expect(shouldComponentUpdateSpy).toHaveBeenCalledTimes(2)
    })
  })

  describe('And the component receives duplicate props', () => {
    test('Then it should not re-render', () => {
      mountWithProps()
      wrapper.setProps(mockProps)

      expect(shouldComponentUpdateSpy).toHaveBeenCalledTimes(4)
    })
  })
})
