import { shallow, mount } from 'enzyme'
import React from 'react'

import { Provider } from 'react-redux'
import Immutable from 'immutable'
import BoxSummaryMobile from 'BoxSummary/BoxSummaryMobile/BoxSummaryMobile'
import BoxSummary from 'BoxSummary/BoxSummary'
import BoxSummaryButton from 'BoxSummary/BoxSummaryButton'
import RecipeList from 'BoxSummary/RecipeList'
import Description from 'BoxSummary/Description'
import Overlay from 'Overlay'
import BrowseCTAButton from 'BoxSummary/BrowseCTAButton'
import BrowseCTA from 'BoxSummary/BrowseCTA'
import { ShortlistTutorial } from 'routes/Menu/ShortlistTutorial'

jest.mock('utils/DOMhelper', () => ({
  getBoundingClientRect: () => ({
    width: 100
  })
}))

jest.mock('utils/overlayOpen', () => false)

describe('BoxSummaryMobile', () => {
  let store
  let boxDetailsVisibilityChange
  let wrapper
  const recipes = Immutable.Map({})
  const requiredProps = {
    stock: Immutable.Map(),
    boxSummaryNext: () => { },
    menuRecipes: Immutable.List(),
    menuRecipesStore: Immutable.Map(),
    basketRestorePreviousValues: () => { },
    boxDetailsVisibilityChange: () => { },
    disabled: false,
    showDetails: false,
    recipes: recipes,
    date: "2016-06-26",
    numPortions: 2
  }
  beforeEach(() => {
    boxDetailsVisibilityChange = jest.fn()
    store = {
      getState: () => ({
        user: Immutable.Map({}),
        auth: Immutable.Map({}),
        basket: Immutable.Map({
          recipes: Immutable.Map({
            123: 1
          })
        }),
        pricing: Immutable.Map({}),
        pending: Immutable.Map({}),
        boxSummaryDeliveryDays: Immutable.Map({}),
        error: Immutable.Map({}),
        request: Immutable.Map({}),
        boxSummaryShow: Immutable.Map({}),
      }),
      subscribe: () => { },
      dispatch: () => { }
    }
    wrapper = shallow(<BoxSummaryMobile {...requiredProps} />)
  })
  afterEach(function (done) {
    jest.clearAllMocks()
    done()
  })

  test('should render no BoxSummary components', () => {
    expect(wrapper.find(BoxSummary).length).toEqual(0)
  })

  test('should render 1 BoxSummaryButton components', () => {
    expect(wrapper.find(BoxSummaryButton).length).toEqual(1)
  })

  test('should render 1 <Description /> component', () => {
    expect(wrapper.find(Description).length).toEqual(0)
  })

  test('should render 1 RecipeList components', () => {
    expect(wrapper.find(RecipeList).length).toEqual(1)
  })

  test('should return a div if view is mobile', () => {
    expect(wrapper.type()).toEqual('div')
  })

  test('should render an Overlay if on mobile', () => {
    wrapper = shallow(<BoxSummaryMobile {...requiredProps} postcode="w3" />)
    expect(wrapper.find(Overlay).length).toEqual(1)
  })

  test('should call the boxDetailsVisibilityChange function prop if clicked on mobile', () => {
    const clickSpy = jest.fn()
    const basketRestorePreviousValuesSpy = jest.fn()
    wrapper = shallow(<BoxSummaryMobile {...requiredProps} boxDetailsVisibilityChange={clickSpy} basketRestorePreviousValues={basketRestorePreviousValuesSpy} />)

    const ButtonWrapper = wrapper.find('.barmobile')
      .children()
      .first()

    ButtonWrapper.simulate('click', { preventDefault: () => { }, target: { className: '' } })
    expect(clickSpy).toHaveBeenCalled()
  })

  test('should have an overlay on mobile which is closed by default', () => {
    const clickSpy = jest.fn()
    const basketRestorePreviousValuesSpy = jest.fn()
    wrapper = shallow(<BoxSummaryMobile {...requiredProps} basketRestorePreviousValues={basketRestorePreviousValuesSpy} boxDetailsVisibilityChange={clickSpy} />)

    expect(wrapper.find(Overlay).prop('open')).toEqual(false)
  })

  test('should close the overlay on mobile on second click on mobile', () => {
    const clickSpy = jest.fn()
    const basketRestorePreviousValuesSpy = jest.fn()

    wrapper = shallow(<BoxSummaryMobile basketRestorePreviousValues={basketRestorePreviousValuesSpy} boxDetailsVisibilityChange={clickSpy} {...requiredProps} />)

    const ButtonWrapper = wrapper.find('.barmobile')
      .children()
      .first()

    ButtonWrapper.simulate('click', { preventDefault: () => { }, target: { className: '' } })
    ButtonWrapper.simulate('click', { preventDefault: () => { }, target: { className: '' } })

    expect(wrapper.find(Overlay).prop('open')).toEqual(false)
  })

  test('should map the basketCheckedOut prop through to the BoxSummaryButtons checkoutPending prop', () => {
    const clickSpy = jest.fn()
    const basketRestorePreviousValuesSpy = jest.fn()
    wrapper = shallow(<BoxSummaryMobile {...requiredProps} basketRestorePreviousValues={basketRestorePreviousValuesSpy} boxDetailsVisibilityChange={clickSpy} basketCheckedOut />)
    expect(wrapper.find(BoxSummaryButton).prop('checkoutPending')).toEqual(true)

    wrapper = shallow(<BoxSummaryMobile {...requiredProps} basketRestorePreviousValues={basketRestorePreviousValuesSpy} boxDetailsVisibilityChange={clickSpy} />)
    expect(wrapper.find(BoxSummaryButton).prop('checkoutPending')).toEqual(false)
  })

  test('should render a close button which when clicked closes the BoxSummary', () => {
    const basketRestorePreviousValuesSpy = jest.fn()
    const clickSpy = jest.fn()

    wrapper = shallow(<BoxSummaryMobile {...requiredProps} showDetails basketRestorePreviousValues={basketRestorePreviousValuesSpy} boxDetailsVisibilityChange={clickSpy} basketCheckedOut />)
    wrapper.find('.closeBtn').simulate('click')
    expect(basketRestorePreviousValuesSpy.mock.calls).toHaveLength(1)
    expect(clickSpy.mock.calls).toHaveLength(1)
    expect(clickSpy.mock.calls[0][0]).toEqual(false)
  })

  test('should render BrowseCTAButton and BrowseCTA if no date is selected and the overlay is closed', () => {
    wrapper = shallow(<BoxSummaryMobile {...requiredProps} date="" />)
    expect(wrapper.find(BrowseCTAButton).length).toEqual(1)
    expect(wrapper.find(BrowseCTA).length).toEqual(1)
  })

  describe('out of stock', () => {
    test('should NOT call boxDetailsVisibilityChange when hasUnavailableRecipes = false', () => {
      mount(
        <Provider store={store}>
          <BoxSummaryMobile
            {...requiredProps}
            hasUnavailableRecipes={false}
            orderSaveError="no-stock"
            boxDetailsVisibilityChange={boxDetailsVisibilityChange}
          />
        </Provider>
      )

      expect(boxDetailsVisibilityChange).not.toHaveBeenCalled()
    })

    test('should NOT call boxDetailsVisibilityChange when there is no stock error msg', () => {
      mount(
        <Provider store={store}>
          <BoxSummaryMobile
            {...requiredProps}
            hasUnavailableRecipes
            orderSaveError="some other error message"
            boxDetailsVisibilityChange={boxDetailsVisibilityChange}
          />
        </Provider>
      )

      expect(boxDetailsVisibilityChange).not.toHaveBeenCalled()
    })

    test('should call boxDetailsVisibilityChange when no-stock and have not ok recipes', () => {
      mount(
        <Provider store={store}>
          <BoxSummaryMobile
            {...requiredProps}
            hasUnavailableRecipes
            orderSaveError="no-stock"
            boxDetailsVisibilityChange={boxDetailsVisibilityChange}
          />
        </Provider>
      )

      expect(boxDetailsVisibilityChange.mock.calls).toHaveLength(1)
      expect(boxDetailsVisibilityChange.mock.calls[0]).toEqual([true, 'mobile'])
    })
  })

  describe('shortlistTutorial', () => {
    test('should render ShortlistTutorial if shouldShowTutorialStep2 true', () => {
      wrapper.setProps({ shouldShowTutorialStep2: true })
      expect(wrapper.find(ShortlistTutorial)).toHaveLength(1)
    })

    test('should close ShortlistTutorial if shouldShowTutorialStep2 true and click on open box summary', () => {
      const incrementTutorialViewedSpy = jest.fn()
      const tutorialTrackingSpy = jest.fn()
      wrapper.setProps({
        shouldShowTutorialStep2: true,
        incrementTutorialViewed: incrementTutorialViewedSpy,
        tutorialTracking: tutorialTrackingSpy
      })

      wrapper.find('.barmobile').children().first().simulate('click', { preventDefault: () => { }, target: { className: '' } })
      expect(incrementTutorialViewedSpy).toHaveBeenCalled()
      expect(tutorialTrackingSpy).toHaveBeenCalled()
    })
  })
})
