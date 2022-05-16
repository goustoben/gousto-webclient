import { shallow } from 'enzyme'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { usePricing } from 'routes/Menu/domains/pricing'

import { Spinner } from 'goustouicomponents'
import { MOBILE_VIEW } from 'utils/view'

import { Title } from '../Title'
import { Price } from '../../Price'

jest.mock('routes/Menu/domains/pricing', () => ({
  usePricing: jest.fn(),
}))

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}))

jest.mock('routes/Menu/components/BoxSummary/utilHooks', () => ({
  useDiscountTip: jest.fn().mockReturnValue(null),
}))

describe('Title', () => {
  let wrapper
  beforeEach(() => {
    useDispatch.mockReturnValue(() => {})
  })

  describe('when pending is false', () => {
    beforeEach(() => {
      usePricing.mockReturnValue({ isPending: false, pricing: {} })
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
      usePricing.mockReturnValue({ isPending: true })
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

  describe('when isSimplifyBasketBarEnabled is on', () => {
    beforeEach(() => {
      useSelector.mockReturnValue(true)
      usePricing.mockReturnValue({ isPending: false, pricing: {} })

      wrapper = shallow(<Title view={MOBILE_VIEW} />)
    })

    describe('and when there are not enough recipes to checkout', () => {
      test('should display the delivery tip', () => {
        expect(wrapper.text()).toBe('Free UK delivery,')
      })
    })

    describe('and when there are enough recipes to checkout', () => {
      beforeEach(() => {
        wrapper.setProps({ numRecipes: 2 })
      })

      test('then it should display price information', () => {
        expect(wrapper.find(Price)).toHaveLength(1)
      })
    })
  })
})
