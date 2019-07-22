import React from 'react'
import { shallow } from 'enzyme'

import { Cookbook } from '../Cookbook'
import MyGousto from '../MyGousto'

describe('MyGousto', () => {
  let wrapper
  const userLoadOrderSpy = jest.fn()

  beforeEach(() => {
    wrapper = shallow(<MyGousto userLoadOrder={userLoadOrderSpy} />)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('rendering', () => {
    test('should render the cookbook', () => {
      expect(wrapper.find(Cookbook).length).toEqual(1)
    })
  })

  describe('componentDidMount', () => {
    test('should call userLoadOrder on mount', () => {
      expect(userLoadOrderSpy).toHaveBeenCalled()
    })
  })
})
