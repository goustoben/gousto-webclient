import React from 'react'
import { shallow } from 'enzyme'
import * as redux from 'react-redux'
import { basketSum } from 'utils/basket'
import { DetailsCTAGroup } from './DetailsCTAGroup'
import { boxSummaryViews } from '../../../../../../utils/boxSummary'

jest.mock('utils/basket', () => ({
  __esModule: true,
  basketSum: jest.fn()
}))

const useSelectorSpy = jest.spyOn(redux, 'useSelector')
const useDispatchSpy = jest.spyOn(redux, 'useDispatch')
useDispatchSpy.mockReturnValue(() => {})

describe('<DetailsCTAGroup', () => {
  describe('when mounted', () => {
    let wrapper
    const makeShallow = () => {
      wrapper = shallow(
        <DetailsCTAGroup
          isBasketRequiredFeatureEnabled
          boxDetailsVisibilityChange={() => { }}
        />
      )
    }

    useSelectorSpy.mockReturnValue(null).mockReturnValue(boxSummaryViews.DETAILS)

    test('renders a single Choose Recipes primary button with 0 recipes', () => {
      basketSum.mockReturnValue(0)
      makeShallow()

      expect(wrapper.find('Connect(CheckoutButton)').prop('variant')).toBe('primary')
      expect(wrapper.find('Connect(CheckoutButton)').prop('children')).toBe('Choose recipes')
    })

    test('renders a single Choose Recipes primary button with 1 recipe', () => {
      basketSum.mockReturnValue(1)
      makeShallow()

      expect(wrapper.find('Connect(CheckoutButton)').prop('variant')).toBe('primary')
      expect(wrapper.find('Connect(CheckoutButton)').prop('children')).toBe('Choose recipes')
    })

    test('renders primary Checkout and secondary Choose recipes buttons with 2 recipes', () => {
      basketSum.mockReturnValue(2)
      makeShallow()

      expect(wrapper.find('Connect(CheckoutButton)').at(0).prop('variant')).toBe('primary')
      expect(wrapper.find('Connect(CheckoutButton)').at(0).prop('children')).toBe('Checkout')
      expect(wrapper.find('Connect(CheckoutButton)').at(1).prop('variant')).toBe('secondary')
      expect(wrapper.find('Connect(CheckoutButton)').at(1).prop('children')).toBe('Choose more recipes')
    })

    test('renders primary Checkout and secondary Choose more recipes buttons with 3 recipes', () => {
      basketSum.mockReturnValue(3)
      makeShallow()

      expect(wrapper.find('Connect(CheckoutButton)').at(0).prop('variant')).toBe('primary')
      expect(wrapper.find('Connect(CheckoutButton)').at(0).prop('children')).toBe('Checkout')
      expect(wrapper.find('Connect(CheckoutButton)').at(1).prop('variant')).toBe('secondary')
      expect(wrapper.find('Connect(CheckoutButton)').at(1).prop('children')).toBe('Choose more recipes')
    })

    test('renders a single Checkout primary button with 4 recipes', () => {
      basketSum.mockReturnValue(4)
      makeShallow()

      expect(wrapper.find('Connect(CheckoutButton)').at(0).prop('variant')).toBe('primary')
      expect(wrapper.find('Connect(CheckoutButton)').at(0).prop('children')).toBe('Checkout')
      expect(wrapper.find('Connect(CheckoutButton)').at(1).prop('variant')).toBe('secondary')
      expect(wrapper.find('Connect(CheckoutButton)').at(1).prop('children')).toBe('Back to menu')
    })

    test('does not render any button with boxSummaryViews !== DETAILS', () => {
      basketSum.mockReturnValue(1)
      useSelectorSpy.mockReturnValue(null).mockReturnValue(boxSummaryViews.DELIVERY_SLOT)
      makeShallow()

      expect(wrapper.find('Connect(CheckoutButton)').length).toBe(0)
    })
  })
})
