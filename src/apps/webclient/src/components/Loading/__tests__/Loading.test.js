import React from 'react'
import { shallow } from 'enzyme'
import Loading, { LoadingTastePreferences, LoadingOverlay } from '../Loading'

describe('<Loading', () => {
  let wrapper

  describe('when LoadingTastePreferences is called', () => {
    beforeEach(() => {
      wrapper = shallow(
        <LoadingTastePreferences />
      )
    })
    test('renders correctly', () => {
      expect(wrapper.find('.tastePreferences').length).toBe(1)
      expect(wrapper.find('.tastePreferencesContent').length).toBe(1)
    })
  })

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
