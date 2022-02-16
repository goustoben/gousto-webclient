import { shallow } from 'enzyme'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { usePricing } from 'routes/Menu/domains/pricing'

import { Spinner } from 'goustouicomponents'
import { MOBILE_VIEW } from 'utils/view'
import { Title } from '../Title/Title'
import { Price } from '../Price'

jest.mock('routes/Menu/domains/pricing', () => ({
  usePricing: jest.fn(),
}))

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}))

describe('Title', () => {
  let wrapper
  beforeEach(() => {
    useSelector.mockReturnValue(true)
    useDispatch.mockReturnValue(() => {})
  })

  describe('when pending is false', () => {
    beforeEach(() => {
      usePricing.mockReturnValue({ pending: false, pricing: {} })
    })
    test('should render a paragraph with date', () => {
      wrapper = shallow(<Title view="desktop" date="2016-06-26" />)

      expect(wrapper.children().at(0).text()).toEqual('Sun 26 Jun')
    })

    test('should display a <Price /> if pending is false', () => {
      wrapper = shallow(<Title />)

      expect(wrapper.find(Spinner).length).toEqual(0)
      expect(wrapper.find(Price).length).toEqual(1)
    })
  })

  describe('when pending is true', () => {
    beforeEach(() => {
      usePricing.mockReturnValue({ pending: true })
    })

    test('should not display a <Spinner /> or <Price /> if pending is true and view is not mobile', () => {
      wrapper = shallow(<Title />)

      expect(wrapper.find(Spinner).length).toEqual(0)
      expect(wrapper.find(Price).length).toEqual(0)
    })

    test('should display a <Spinner /> if pending is true and view is mobile', () => {
      wrapper = shallow(<Title view={MOBILE_VIEW} />)

      expect(wrapper.find(Spinner).length).toEqual(1)
      expect(wrapper.find(Price).length).toEqual(0)
    })
  })
})
