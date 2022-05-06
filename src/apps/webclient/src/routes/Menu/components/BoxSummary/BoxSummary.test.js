import React from 'react'

import { shallow } from 'enzyme'
import Immutable from 'immutable'
import * as basketUtils from 'utils/basket'

import BoxSummary from './BoxSummary'

import { BoxSummaryBanner } from './Banner/BoxSummaryBanner'
import { BoxSummaryOverlayContainer } from './BoxSummaryOverlay/BoxSummaryOverlayContainer'
import { CheckoutErrorModal } from './CheckooutErrorModal/CheckoutErrorModal'

describe('<BoxSummary />', () => {
  let wrapper
  const defaultProps = {
    isMobile: false,
    date: '2016-01-01',
    numPortions: 2,
    recipes: Immutable.fromJS({
      4: 1,
      2726: 2,
    }),
    menuRecipesStore: Immutable.fromJS({
      1: 'store1',
      2: 'store2',
      3: 'store3',
      4: 'store4',
    }),
    showDetails: true,
    boxDetailsVisibilityChange: () => {},
    basketRestorePreviousValues: () => {},
    menuRecipes: Immutable.fromJS([{ id: '2726' }, { id: '4' }]),
    stock: Immutable.fromJS({ 1: {} }),
    disabled: false,
    menuFetchPending: false,
    hasUnavailableRecipes: false,
    orderSaveError: 'error',
    maxRecipesNum: 2,
    pricingPending: false,
    slotId: '123',
    shouldShowBoxSummary: false,
    deliveryDays: Immutable.fromJS({ '2019-02-02': {} }),
  }

  let boxDetailsVisibilityChangeSpy

  describe('rendering', () => {
    beforeEach(() => {
      jest.spyOn(basketUtils, 'basketSum').mockImplementation(() => false)
      jest.spyOn(basketUtils, 'okRecipes').mockImplementation(() => false)
      boxDetailsVisibilityChangeSpy = jest.fn()
      wrapper = shallow(
        <BoxSummary
          {...defaultProps}
          boxDetailsVisibilityChange={boxDetailsVisibilityChangeSpy}
          shouldShowBoxSummary
        />,
      )
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    test('should return a <div>', () => {
      expect(wrapper.type()).toBe('div')
    })

    test('should contain one BoxSummaryBanner component', () => {
      expect(wrapper.find(BoxSummaryBanner).length).toEqual(1)
    })

    test('should contain one CheckoutErrorModal component', () => {
      expect(wrapper.find(CheckoutErrorModal).length).toEqual(1)
    })

    test('should contain one BoxSummaryOverlayContainer component', () => {
      expect(wrapper.find(BoxSummaryOverlayContainer).length).toEqual(1)
    })
  })

  describe('componentDidMount', () => {
    describe('when shouldShowBoxSummary is true', () => {
      beforeEach(() => {
        jest.spyOn(basketUtils, 'basketSum').mockImplementation(() => false)
        jest.spyOn(basketUtils, 'okRecipes').mockImplementation(() => false)
        boxDetailsVisibilityChangeSpy = jest.fn()
        wrapper = shallow(
          <BoxSummary
            {...defaultProps}
            boxDetailsVisibilityChange={boxDetailsVisibilityChangeSpy}
            shouldShowBoxSummary
          />,
        )
      })

      afterEach(() => {
        jest.resetAllMocks()
      })
      test('should call boxDetailsVisibilityChange', () => {
        expect(boxDetailsVisibilityChangeSpy).toHaveBeenCalledWith(true)
      })
    })

    describe('when shouldShowBoxSummary is false', () => {
      beforeEach(() => {
        wrapper = shallow(
          <BoxSummary
            {...defaultProps}
            boxDetailsVisibilityChange={boxDetailsVisibilityChangeSpy}
            shouldShowBoxSummary={false}
          />,
        )
      })
      test('should not call boxDetailsVisibilityChange', () => {
        expect(boxDetailsVisibilityChangeSpy).not.toHaveBeenCalled()
      })
    })
  })
})
