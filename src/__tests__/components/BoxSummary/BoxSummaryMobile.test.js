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
import css from 'BoxSummary/BoxSummaryMobile/BoxSummaryMobile.css'
import BrowseCTAButton from 'BoxSummary/BrowseCTAButton'
import BrowseCTA from 'BoxSummary/BrowseCTA'

jest.mock('utils/DOMhelper', () => ({
  getBoundingClientRect: () => ({
    width: 100
  })
}))

jest.mock('utils/overlayOpen', () => false)

describe('BoxSummaryMobile', () => {
  let store
  let boxDetailsVisibilityChange
  const requiredProps = {
    stock: Immutable.Map(),
    boxSummaryNext: () => { },
    menuRecipes: Immutable.List(),
    menuRecipesStore: Immutable.Map(),
    basketRestorePreviousValues: () => { },
    disabled: false
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
        error: Immutable.Map({})
      }),
      subscribe: () => { },
      dispatch: () => { }
    }
  })
  afterEach(function (done) {
    jest.clearAllMocks()
    done()
  })

  const recipes = Immutable.Map({}) // eslint-disable-line new-cap

  test('should render no BoxSummary components', () => {
    const wrapper = shallow(<BoxSummaryMobile date="2016-06-26" numPortions={2} recipes={recipes} showDetails={false} boxDetailsVisibilityChange={() => { }} {...requiredProps} />)
    expect(wrapper.find(BoxSummary).length).toEqual(0)
  })

  test('should render 1 BoxSummaryButton components', () => {
    const wrapper = shallow(<BoxSummaryMobile date="2016-06-26" numPortions={2} recipes={recipes} showDetails={false} boxDetailsVisibilityChange={() => { }} {...requiredProps} />)
    expect(wrapper.find(BoxSummaryButton).length).toEqual(1)
  })

  test('should render 1 <Description /> component', () => {
    const wrapper = shallow(<BoxSummaryMobile date="2016-06-26" numPortions={2} recipes={recipes} showDetails={false} boxDetailsVisibilityChange={() => { }} {...requiredProps} />)
    expect(wrapper.find(Description).length).toEqual(0)
  })

  test('should render 1 RecipeList components', () => {
    const wrapper = shallow(<BoxSummaryMobile date="2016-06-26" numPortions={2} recipes={recipes} showDetails={false} boxDetailsVisibilityChange={() => { }} {...requiredProps} />)
    expect(wrapper.find(RecipeList).length).toEqual(1)
  })

  test('should return a div if view is mobile', () => {
    const wrapper = shallow(<BoxSummaryMobile date="2016-06-26" numPortions={2} recipes={recipes} showDetails={false} boxDetailsVisibilityChange={() => { }} {...requiredProps} />)
    expect(wrapper.type()).toEqual('div')
  })

  test('should render an Overlay if on mobile', () => {
    const wrapper = shallow(<BoxSummaryMobile date="2016-06-26" postcode="w3" numPortions={2} recipes={recipes} showDetails={false} boxDetailsVisibilityChange={() => { }} {...requiredProps} />)
    expect(wrapper.find(Overlay).length).toEqual(1)
  })

  test('should call the boxDetailsVisibilityChange function prop if clicked on mobile', () => {
    const clickSpy = jest.fn()
    const basketRestorePreviousValuesSpy = jest.fn()
    const wrapper = shallow(<BoxSummaryMobile date="2016-06-26" numPortions={2} recipes={recipes} showDetails={false} boxDetailsVisibilityChange={clickSpy} basketRestorePreviousValues={basketRestorePreviousValuesSpy} {...requiredProps} />)

    const ButtonWrapper = wrapper.find(`.${css.barmobile.split(' ').join('.')}`)
      .children()
      .first()

    ButtonWrapper.simulate('click', { preventDefault: () => { }, target: { className: '' } })
    expect(clickSpy).toHaveBeenCalled()
  })

  test('should have an overlay on mobile which is closed by default', () => {
    const clickSpy = jest.fn()
    const basketRestorePreviousValuesSpy = jest.fn()
    const wrapper = shallow(<BoxSummaryMobile date="2016-06-26" numPortions={2} recipes={recipes} showDetails={false} basketRestorePreviousValues={basketRestorePreviousValuesSpy} boxDetailsVisibilityChange={clickSpy} {...requiredProps} />)

    expect(wrapper.find(Overlay).prop('open')).toEqual(false)
  })

  test('should close the overlay on mobile on second click on mobile', () => {
    const clickSpy = jest.fn()
    const basketRestorePreviousValuesSpy = jest.fn()

    const wrapper = shallow(<BoxSummaryMobile date="2016-06-26" numPortions={2} recipes={recipes} showDetails={false} basketRestorePreviousValues={basketRestorePreviousValuesSpy} boxDetailsVisibilityChange={clickSpy} {...requiredProps} />)

    const ButtonWrapper = wrapper.find(`.${css.barmobile.split(' ').join('.')}`)
      .children()
      .first()

    ButtonWrapper.simulate('click', { preventDefault: () => { }, target: { className: '' } })
    ButtonWrapper.simulate('click', { preventDefault: () => { }, target: { className: '' } })

    expect(wrapper.find(Overlay).prop('open')).toEqual(false)
  })

  test('should map the basketCheckedOut prop through to the BoxSummaryButtons checkoutPending prop', () => {
    const clickSpy = jest.fn()
    const basketRestorePreviousValuesSpy = jest.fn()
    let wrapper = shallow(<BoxSummaryMobile date="2016-06-26" numPortions={2} recipes={recipes} showDetails={false} basketRestorePreviousValues={basketRestorePreviousValuesSpy} boxDetailsVisibilityChange={clickSpy} basketCheckedOut {...requiredProps} />)
    expect(wrapper.find(BoxSummaryButton).prop('checkoutPending')).toEqual(true)

    wrapper = shallow(<BoxSummaryMobile date="2016-06-26" numPortions={2} recipes={recipes} basketRestorePreviousValues={basketRestorePreviousValuesSpy} boxDetailsVisibilityChange={clickSpy} showDetails={false} {...requiredProps} />)
    expect(wrapper.find(BoxSummaryButton).prop('checkoutPending')).toEqual(false)
  })

  test('should render a close button which when clicked closes the BoxSummary', () => {
    const basketRestorePreviousValuesSpy = jest.fn()
    const clickSpy = jest.fn()

    const wrapper = shallow(<BoxSummaryMobile date="2016-06-26" {...requiredProps} numPortions={2} recipes={recipes} showDetails basketRestorePreviousValues={basketRestorePreviousValuesSpy} boxDetailsVisibilityChange={clickSpy} basketCheckedOut />)
    wrapper.find('div').at(6).simulate('click')
    expect(basketRestorePreviousValuesSpy.mock.calls).toHaveLength(1)
    expect(clickSpy.mock.calls).toHaveLength(1)
    expect(clickSpy.mock.calls[0][0]).toEqual(false)
  })

  test('should render BrowseCTAButton and BrowseCTA if no date is selected and the overlay is closed', () => {
    const wrapper = shallow(<BoxSummaryMobile date="" numPortions={2} recipes={recipes} basketRestorePreviousValues={() => { }} boxSummaryUpdateDeliveryDay={() => { }} boxDetailsVisibilityChange={() => { }} showDetails={false} {...requiredProps} />)
    expect(wrapper.find(BrowseCTAButton).length).toEqual(1)
    expect(wrapper.find(BrowseCTA).length).toEqual(1)
  })

  describe('out of stock', () => {
    test('should NOT call boxDetailsVisibilityChange when hasUnavailableRecipes = false', () => {
      mount(
        <Provider store={store}>
          <BoxSummaryMobile
            date="2016-06-26"
            numPortions={2}
            recipes={recipes}
            showDetails={false}
            hasUnavailableRecipes={false}
            orderSaveError="no-stock"
            boxDetailsVisibilityChange={boxDetailsVisibilityChange}
            {...requiredProps}
          />
        </Provider>
      )

      expect(boxDetailsVisibilityChange).not.toHaveBeenCalled()
    })

    test('should NOT call boxDetailsVisibilityChange when there is no stock error msg', () => {
      mount(
        <Provider store={store}>
          <BoxSummaryMobile
            date="2016-06-26"
            numPortions={2}
            recipes={recipes}
            showDetails={false}
            hasUnavailableRecipes
            orderSaveError="some other error message"
            boxDetailsVisibilityChange={boxDetailsVisibilityChange}
            {...requiredProps}
          />
        </Provider>
      )

      expect(boxDetailsVisibilityChange).not.toHaveBeenCalled()
    })

    test('should call boxDetailsVisibilityChange when no-stock and have not ok recipes', () => {
      mount(
        <Provider store={store}>
          <BoxSummaryMobile
            date="2016-06-26"
            numPortions={2}
            recipes={recipes}
            showDetails={false}
            hasUnavailableRecipes
            orderSaveError="no-stock"
            boxDetailsVisibilityChange={boxDetailsVisibilityChange}
            {...requiredProps}
          />
        </Provider>
      )

      expect(boxDetailsVisibilityChange.mock.calls).toHaveLength(1)
      expect(boxDetailsVisibilityChange.mock.calls[0]).toEqual([true, 'mobile'])
    })
  })
})
