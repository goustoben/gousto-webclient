import React from 'react'
import Immutable from 'immutable'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import { ShowcaseMenu } from '../ShowcaseMenu'

jest.mock('routes/Menu/DetailOverlay', () => ({
  DetailOverlayContainer: jest.fn(() => <div />),
}))

describe('ShowcaseMenu', () => {
  let wrapper
  const proceed = jest.fn()
  const changeCollection = jest.fn()
  const openRecipeDetails = jest.fn()
  const trackScrollOneStep = jest.fn()
  const trackShowcaseMenuView = jest.fn()

  describe('when rendered', () => {
    beforeEach(() => {
      wrapper = shallow(
        <ShowcaseMenu
          proceed={proceed}
          recipes={Immutable.List()}
          collectionDescriptorsInLines={[]}
          collectionDescriptorsSingleLine={[]}
          changeCollection={changeCollection}
          openRecipeDetails={openRecipeDetails}
          trackScrollOneStep={trackScrollOneStep}
          trackShowcaseMenuView={trackShowcaseMenuView}
        />
      )
    })

    test('renders correctly', () => {
      expect(wrapper.find('HotjarTrigger').exists()).toBe(true)
      expect(wrapper.find('Connect(DiscountAppliedBar)').exists()).toBe(true)
      expect(wrapper.find('.heading').exists()).toBe(true)
      expect(wrapper.find('CollectionPicker').exists()).toBe(true)
      expect(wrapper.find('Recipes').exists()).toBe(true)
      expect(wrapper.find('InformationBox').exists()).toBe(true)
      expect(wrapper.find('CTASection').exists()).toBe(true)
      expect(wrapper.find('PriceExplanationSection').exists()).toBe(true)
    })

    describe('when the CTA is clicked', () => {
      beforeEach(() => {
        wrapper.find('CTASection').simulate('click')
      })

      test('then it should invoke proceed', () => {
        expect(proceed).toHaveBeenCalledWith()
      })
    })
  })

  xdescribe('when mounted', () => {
    const state = {
      ribbon: Immutable.fromJS({}),
      basket: Immutable.fromJS({}),
      auth: Immutable.fromJS({}),
      error: Immutable.fromJS({}),
      signup: Immutable.fromJS({}),
      loginVisibility: Immutable.fromJS({}),
      persist: Immutable.fromJS({}),
      request: Immutable.fromJS({}),
      promoStore: Immutable.fromJS({}),
      user: Immutable.fromJS({}),
      pending: Immutable.fromJS({}),
      menuBoxPrices: Immutable.fromJS({ 2: { 2: { gourmet: {} } } }),
    }

    const store = {
      getState: jest.fn().mockReturnValue(state),
      dispatch: jest.fn(),
      subscribe: jest.fn(),
    }

    beforeEach(() => {
      wrapper = mount(
        <ShowcaseMenu
          proceed={proceed}
          recipes={Immutable.List()}
          collectionDescriptorsInLines={[]}
          collectionDescriptorsSingleLine={[]}
          changeCollection={changeCollection}
          openRecipeDetails={openRecipeDetails}
          trackScrollOneStep={trackScrollOneStep}
          trackShowcaseMenuView={trackShowcaseMenuView}
        />,
        {
          // eslint-disable-next-line react/prop-types
          wrappingComponent: ({ children }) => <Provider store={store}>{children}</Provider>,
        }
      )
    })

    test('then it should send the showcaseMenuView snowplow event', () => {
      expect(trackShowcaseMenuView).toHaveBeenCalled()
    })
  })
})
