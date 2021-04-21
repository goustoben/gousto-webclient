import React from 'react'
import { shallow } from 'enzyme'
import { FlexibilityMessage } from '../FlexibilityMessage'

describe('Homepage FlexibilityMessage', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<FlexibilityMessage />)
  })

  test('should be exist', () => {
    expect(wrapper.find(FlexibilityMessage)).toBeDefined()
  })
})
