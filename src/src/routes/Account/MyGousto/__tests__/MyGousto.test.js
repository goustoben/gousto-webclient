import React from 'react'
import { shallow } from 'enzyme'

import { Cookbook } from '../Cookbook'
import { Notification } from '../Notification'
import { Header } from '../Header'
import MyGousto from '../MyGousto'

describe('MyGousto', () => {
  let wrapper
  const userLoadOrdersSpy = jest.fn()

  beforeEach(() => {
    wrapper = shallow(<MyGousto userLoadOrders={userLoadOrdersSpy} />)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('rendering', () => {
    test('should render the cookbook', () => {
      expect(wrapper.find(Cookbook).length).toEqual(1)
    })

    test('should render the notification component', () => {
      expect(wrapper.find(Notification).length).toEqual(1)
    })

    test('should render the header component', () => {
      expect(wrapper.find(Header).length).toEqual(1)
    })
  })

  describe('componentDidMount', () => {
    test('should call userLoadOrders on mount', () => {
      expect(userLoadOrdersSpy).toHaveBeenCalled()
    })
  })
})
