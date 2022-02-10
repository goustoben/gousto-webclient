import React from 'react'
import { shallow } from 'enzyme'
import Loading, { LoadingOverlay } from '../Loading'

describe('<Loading', () => {
  let wrapper

  describe('when LoadingOverlay is called', () => {
    beforeEach(() => {
      wrapper = shallow(
        <LoadingOverlay />
      )
    })
    test('renders correctly', () => {
      expect(wrapper.find('Loading').length).toBe(1)
    })
  })

  describe('when Loading is called', () => {
    beforeEach(() => {
      wrapper = shallow(
        <Loading className="test-class-name" />
      )
    })
    test('renders correctly', () => {
      expect(wrapper.find('.test-class-name').length).toBe(1)
    })
  })
})
